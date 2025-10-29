
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { summarizeLegalDocument } from '@/ai/flows/legal-document-summarization';
import { Sparkles, FileText, Bot, Clipboard, Loader2, Languages, UploadCloud, FileCheck2, Trash2, History } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SummaryHistoryItem {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
}

export default function SummarizerClient() {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('text');
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<SummaryHistoryItem[]>('summary-history', []);
  
  const sampleText = "এই চুক্তিটি প্রথম পক্ষের, অতঃপর 'লিজদাতা' হিসাবে উল্লেখিত, এবং দ্বিতীয় পক্ষের, অতঃপর 'লিজগ্রহীতা' হিসাবে উল্লেখিত, এর মধ্যে এই দিনে সম্পাদিত এবং স্বাক্ষরিত হয়েছে। লিজদাতা এতদ্বারা এখানে উল্লেখিত ঠিকানায় অবস্থিত প্রাঙ্গণটি, এখানে নির্ধারিত শর্তাবলী অনুসারে ইজারা দিতে সম্মত হয়েছেন। লিজগ্রহীতা, এই ইজারার বিবেচনার জন্য, সময়মত মাসিক ভাড়া পরিশোধ করতে এবং প্রাঙ্গণটি ভাল অবস্থায় এবং অবস্থায় বজায় রাখতে প্রতিশ্রুতিবদ্ধ, যুক্তিসঙ্গত পরিধান এবং টিয়ার ব্যতীত। এই ইজারার মেয়াদ বারো (১২) মাসের জন্য হবে, যা শুরুর তারিখে শুরু হবে এবং সমাপ্তির তারিখে শেষ হবে, যদি না এই চুক্তির বিধান অনুসারে পুনর্নবীকরণ বা তাড়াতাড়ি সমাপ্ত হয়। লিজগ্রহীতার দ্বারা এই ইজারার শর্তাবলী মেনে চলতে কোনো ব্যর্থতা চুক্তির লঙ্ঘন হিসাবে গণ্য করা হবে এবং এর ফলে এই চুক্তিটি বাতিল হতে পারে এবং আইন দ্বারা অনুমোদিত উচ্ছেদ কার্যক্রম হতে পারে।";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        if (selectedFile.size > 4 * 1024 * 1024) { // 4MB size limit
            toast({
                title: 'ফাইলের আকার অনেক বড়',
                description: 'অনুগ্রহ করে ৪ মেগাবাইটের চেয়ে ছোট ফাইল আপলোড করুন।',
                variant: 'destructive',
            });
            return;
        }
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            setFileDataUri(loadEvent.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
    }
  };

  const handleSummarize = async () => {
    const isTextMode = activeTab === 'text';
    if (isTextMode && !documentText.trim()) {
      toast({
        title: 'ইনপুট প্রয়োজন',
        description: 'অনুগ্রহ করে সারসংক্ষেপ করার জন্য কিছু আইনি লেখা দিন।',
        variant: 'destructive',
      });
      return;
    }
    if (!isTextMode && !fileDataUri) {
       toast({
        title: 'ফাইল প্রয়োজন',
        description: 'অনুগ্রহ করে সারসংক্ষেপ করার জন্য একটি ফাইল আপলোড করুন।',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary('');
    try {
      const input = isTextMode 
        ? { documentText }
        : { fileDataUri };

      const result = await summarizeLegalDocument(input);
      setSummary(result.summary);

      // Add to history
      const newHistoryItem: SummaryHistoryItem = {
          id: new Date().toISOString(),
          title: result.summary.substring(0, 40) + '...',
          summary: result.summary,
          timestamp: new Date().toLocaleString('bn-BD'),
      };
      setHistory([newHistoryItem, ...history]);

    } catch (error) {
      console.error('নথি সারসংক্ষেপ করতে সমস্যা হয়েছে:', error);
      toast({
        title: 'ত্রুটি',
        description: 'নথিটি সারসংক্ষেপ করা যায়নি। আবার চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast({
        title: 'কপি করা হয়েছে',
        description: 'সারসংক্ষেপটি ক্লিপবোর্ডে কপি করা হয়েছে।',
    })
  }

  const resetFile = () => {
    setFile(null);
    setFileDataUri(null);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <main className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                মূল নথি
              </CardTitle>
               <CardDescription>
                আপনার আইনি নথিটি নিচে পেস্ট করুন অথবা একটি ফাইল আপলোড করুন।
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="text">লেখা পেস্ট করুন</TabsTrigger>
                        <TabsTrigger value="upload">ফাইল আপলোড করুন</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className="mt-4">
                         <Textarea
                            placeholder="আপনার আইনি নথির লেখা এখানে পেস্ট করুন..."
                            className="min-h-[350px] text-base"
                            value={documentText}
                            onChange={(e) => setDocumentText(e.target.value)}
                            disabled={isLoading}
                        />
                        <div className="mt-4">
                            <Button variant="outline" size="sm" onClick={() => setDocumentText(sampleText)} disabled={isLoading}>
                                <Clipboard className="w-4 h-4 mr-2" />
                                নমুনা ব্যবহার করুন
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4">
                        <div className="min-h-[350px] flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
                            {file ? (
                                 <div className="text-center">
                                    <FileCheck2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                                    <p className="font-semibold">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                                    <Button variant="ghost" size="sm" className="mt-4 text-red-500 hover:text-red-600" onClick={resetFile}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        সরিয়ে ফেলুন
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                                    <h3 className="font-semibold">এখানে ফাইল আপলোড করুন</h3>
                                    <p className="text-sm text-muted-foreground">একটি ফাইল টেনে আনুন বা ক্লিক করে বেছে নিন</p>
                                    <Input 
                                        id="file-upload" 
                                        type="file" 
                                        className="hidden" 
                                        accept=".pdf,image/jpeg,image/png"
                                        onChange={handleFileChange}
                                    />
                                    <Button asChild variant="outline" className="mt-4">
                                        <label htmlFor="file-upload">ফাইল ব্রাউজ করুন</label>
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG (সর্বোচ্চ ৪ মেগাবাইট)</p>
                                </>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
             
              <div className="flex justify-end items-center mt-4 gap-2">
                <Button onClick={handleSummarize} disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      সারসংক্ষেপ করা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      সারসংক্ষেপ করুন
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Bot className="w-6 h-6" />
                    AI-এর তৈরি সহজ সারসংক্ষেপ
                </CardTitle>
                {summary && !isLoading && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Clipboard className="w-4 h-4 mr-2" />
                      কপি
                    </Button>
                    <Button variant="outline" size="sm">
                      <Languages className="w-4 h-4 mr-2" />
                      অনুবাদ
                    </Button>
                  </div>
                )}
              </div>
               <CardDescription>
                আপনার নথির সহজ সারসংক্ষেপ নিচে দেখানো হবে।
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-4 bg-muted rounded-md">
                  <Sparkles className="w-10 h-10 text-primary animate-spin" />
                  <p className="mt-4 text-muted-foreground">AI আপনার নথি বিশ্লেষণ করছে...</p>
                  <p className="text-sm text-muted-foreground">এতে কয়েক মুহূর্ত সময় লাগতে পারে।</p>
                </div>
              ) : summary ? (
                <div className="prose prose-lg max-w-none text-foreground p-4 bg-muted rounded-md min-h-[400px] relative">
                  <p>{summary}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] text-muted-foreground p-4 bg-muted/50 rounded-md">
                   <Languages className="w-12 h-12 mb-4" />
                   <h3 className="font-semibold text-lg">নথির জন্য অপেক্ষা করা হচ্ছে</h3>
                   <p className="max-w-xs">আপনি একটি নথি দিলেই তার সহজ সারসংক্ষেপ এখানে তৈরি হবে।</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="lg:col-span-1">
             <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <History className="w-5 h-5" />
                        ইতিহাস
                    </CardTitle>
                    <div className="flex justify-end">
                        <Button variant="link" size="sm" className="text-xs p-0 h-auto" onClick={() => setHistory([])} disabled={history.length === 0}>
                           সব মুছুন
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {history.length > 0 ? (
                        <ScrollArea className="h-96">
                            <div className="space-y-4">
                                {history.map(item => (
                                    <div key={item.id} className="p-3 rounded-md hover:bg-muted cursor-pointer" onClick={() => setSummary(item.summary)}>
                                        <p className="text-sm font-medium truncate">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>এখনো কোনো সারসংক্ষেপ নেই।</p>
                        </div>
                    )}
                </CardContent>
             </Card>
        </aside>
    </div>
  );
}
