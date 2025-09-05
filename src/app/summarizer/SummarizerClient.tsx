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
  
  const sampleText = "এই চুক্তিটি আজ এই তারিখে প্রথম পক্ষের, অতঃপর 'ইজারাদাতা' হিসাবে উল্লেখিত, এবং দ্বিতীয় পক্ষের, অতঃপর 'ইজারগ্রহীতা' হিসাবে উল্লেখিত, মধ্যে সম্পাদিত এবং заклюচিত হয়েছে। ইজারাদাতা এতদ্বারা উল্লেখিত ঠিকানায় অবস্থিত परिसरটি এখানে নির্ধারিত শর্তাবলী অনুসারে ইজারা দিতে সম্মত হয়েছেন। ইজারগ্রহীতা, ইজারার প্রতিদানে, মাসিক ভাড়া সময়মত পরিশোধ করতে এবং परिसरটি ভাল অবস্থায় এবং শর্তে বজায় রাখতে প্রতিশ্রুতিবদ্ধ, যুক্তিসঙ্গত ব্যবহারজনিত ক্ষতি ছাড়া। এই ইজারার মেয়াদ বারো (১২) মাসের জন্য হবে, যা শুরুর তারিখে শুরু হবে এবং শেষের তারিখে শেষ হবে, যদি না এই চুক্তির বিধান অনুসারে আগে नवीकरण বা समाप्त করা হয়। ইজারগ্রহীতা দ্বারা এই ইজারার শর্তাবলী মেনে চলতে أي ব্যর্থতা চুক্তি লঙ্ঘন হিসাবে গণ্য হবে এবং ಕಾನೂন দ্বারা অনুমোদিত হিসাবে এই চুক্তিটি समाप्त করা এবং পরবর্তীকালে উচ্ছেদ നടപ કાર્યવાહી হতে পারে।";

  const handleSummarize = async () => {
    if (!documentText.trim()) {
      toast({
        title: 'ইনপুট প্রয়োজন',
        description: 'সারসংক্ষেপ করার জন্য অনুগ্রহ করে কিছু আইনি পাঠ্য পেস্ট করুন।',
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
      console.error('Error summarizing document:', error);
      toast({
        title: 'ত্রুটি',
        description: 'নথিটি সারসংক্ষেপ করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
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
            আপনার আইনি নথি নীচে পেস্ট করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="আপনার আইনি নথির পাঠ্য এখানে পেস্ট করুন..."
            className="min-h-[350px] text-base"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
             <Button variant="outline" onClick={() => setDocumentText(sampleText)} disabled={isLoading}>
              <Clipboard className="w-4 h-4 mr-2" />
              নমুনা পাঠ্য ব্যবহার করুন
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
                  বাংলায় সারসংক্ষেপ করুন
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
            AI-চালিত সরলীকৃত সারসংক্ষেপ
          </CardTitle>
           <CardDescription>
            আপনার নথির সরলীকৃত সারসংক্ষেপ নীচে প্রদর্শিত হবে।
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] p-4 bg-muted rounded-md">
              <Sparkles className="w-10 h-10 text-primary animate-spin" />
              <p className="mt-4 text-muted-foreground">আমাদের AI আপনার নথি বিশ্লেষণ করছে...</p>
              <p className="text-sm text-muted-foreground">এতে কয়েক মুহূর্ত সময় লাগতে পারে।</p>
            </div>
          ) : summary ? (
            <div className="prose prose-lg max-w-none text-foreground p-4 bg-muted rounded-md min-h-[350px]">
              <p lang="bn">{summary}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[350px] text-muted-foreground p-4 bg-muted/50 rounded-md">
               <Languages className="w-12 h-12 mb-4" />
               <h3 className="font-semibold text-lg">নথির জন্য অপেক্ষা করা হচ্ছে</h3>
               <p className="max-w-xs">আপনি একটি নথি সরবরাহ করার পরে আপনার বাংলায় সরলীকৃত সারসংক্ষেপ এখানে তৈরি করা হবে।</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
