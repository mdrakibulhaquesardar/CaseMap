'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { summarizeLegalDocument } from '@/ai/flows/legal-document-summarization';
import { Sparkles, FileText, Bot, Clipboard, Loader2, Languages } from 'lucide-react';

export default function SummarizerClient() {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const sampleText = "এই চুক্তিটি প্রথম পক্ষের, অতঃপর 'লিজদাতা' হিসাবে উল্লেখিত, এবং দ্বিতীয় পক্ষের, অতঃপর 'লিজগ্রহীতা' হিসাবে উল্লেখিত, এর মধ্যে এই দিনে সম্পাদিত এবং স্বাক্ষরিত হয়েছে। লিজদাতা এতদ্বারা এখানে উল্লেখিত ঠিকানায় অবস্থিত প্রাঙ্গণটি, এখানে নির্ধারিত শর্তাবলী অনুসারে ইজারা দিতে সম্মত হয়েছেন। লিজগ্রহীতা, এই ইজারার বিবেচনার জন্য, সময়মত মাসিক ভাড়া পরিশোধ করতে এবং প্রাঙ্গণটি ভাল অবস্থায় এবং অবস্থায় বজায় রাখতে প্রতিশ্রুতিবদ্ধ, যুক্তিসঙ্গত পরিধান এবং টিয়ার ব্যতীত। এই ইজারার মেয়াদ বারো (১২) মাসের জন্য হবে, যা শুরুর তারিখে শুরু হবে এবং সমাপ্তির তারিখে শেষ হবে, যদি না এই চুক্তির বিধান অনুসারে পুনর্নবীকরণ বা তাড়াতাড়ি সমাপ্ত হয়। লিজগ্রহীতার দ্বারা এই ইজারার শর্তাবলী মেনে চলতে কোনো ব্যর্থতা চুক্তির লঙ্ঘন হিসাবে গণ্য হবে এবং এর ফলে এই চুক্তিটি বাতিল হতে পারে এবং আইন দ্বারা অনুমোদিত উচ্ছেদ কার্যক্রম হতে পারে।";

  const handleSummarize = async () => {
    if (!documentText.trim()) {
      toast({
        title: 'ইনপুট প্রয়োজন',
        description: 'অনুগ্রহ করে সারসংক্ষেপ করার জন্য কিছু আইনি লেখা দিন।',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeLegalDocument({ documentText });
      setSummary(result.summary);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            মূল নথি
          </CardTitle>
          <CardDescription>
            আপনার আইনি নথিটি নিচে পেস্ট করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="আপনার আইনি নথির লেখা এখানে পেস্ট করুন..."
            className="min-h-[350px] text-base"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
             <Button variant="outline" onClick={() => setDocumentText(sampleText)} disabled={isLoading}>
              <Clipboard className="w-4 h-4 mr-2" />
              নমুনা ব্যবহার করুন
            </Button>
            <Button onClick={handleSummarize} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  সারসংক্ষেপ করা হচ্ছে...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  ইংরেজিতে সারসংক্ষেপ করুন
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Bot className="w-6 h-6" />
            AI-এর তৈরি সহজ সারসংক্ষেপ
          </CardTitle>
           <CardDescription>
            আপনার নথির সহজ সারসংক্ষেপ নিচে দেখানো হবে।
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] p-4 bg-muted rounded-md">
              <Sparkles className="w-10 h-10 text-primary animate-spin" />
              <p className="mt-4 text-muted-foreground">AI আপনার নথি বিশ্লেষণ করছে...</p>
              <p className="text-sm text-muted-foreground">এতে কয়েক মুহূর্ত সময় লাগতে পারে।</p>
            </div>
          ) : summary ? (
            <div className="prose prose-lg max-w-none text-foreground p-4 bg-muted rounded-md min-h-[350px]">
              <p>{summary}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[350px] text-muted-foreground p-4 bg-muted/50 rounded-md">
               <Languages className="w-12 h-12 mb-4" />
               <h3 className="font-semibold text-lg">নথির জন্য অপেক্ষা করা হচ্ছে</h3>
               <p className="max-w-xs">আপনি একটি নথি দিলেই তার সহজ সারসংক্ষেপ এখানে তৈরি হবে।</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
