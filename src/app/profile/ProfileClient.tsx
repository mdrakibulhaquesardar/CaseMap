'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { CaseTimeline, FaqItem } from '@/types';
import { Bookmark, Gavel, Trash2, Info, MessageSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { caseTimelineData, faqData } from '@/lib/dummy-data';

export default function ProfileClient() {
  const [savedCases, setSavedCases] = useLocalStorage<CaseTimeline[]>('savedCases', Object.values(caseTimelineData));
  const [savedFaqs, setSavedFaqs] = useLocalStorage<FaqItem[]>('savedFaqs', faqData.slice(0,2));
  const { toast } = useToast();

  const removeCase = (caseNumber: string) => {
    setSavedCases(savedCases.filter(c => c.caseNumber !== caseNumber));
    toast({ title: "মামলা সফলভাবে মুছে ফেলা হয়েছে।"});
  };

  const removeFaq = (id: number) => {
    setSavedFaqs(savedFaqs.filter(faq => faq.id !== id));
    toast({ title: "প্রশ্নোত্তর সফলভাবে মুছে ফেলা হয়েছে।"});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cases">
            <Gavel className="w-4 h-4 mr-2" />
            সংরক্ষিত মামলা ({savedCases.length})
          </TabsTrigger>
          <TabsTrigger value="faqs">
            <Bookmark className="w-4 h-4 mr-2" />
            সংরক্ষিত প্রশ্নোত্তর ({savedFaqs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>সংরক্ষিত মামলা</CardTitle>
              <CardDescription>
                দ্রুত অ্যাক্সেসের জন্য আপনি যে মামলার টাইমলাইনগুলি সংরক্ষণ করেছেন সেগুলি এখানে রয়েছে।
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedCases.length > 0 ? (
                savedCases.map((c) => (
                  <div key={c.caseNumber} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-semibold">{c.title}</p>
                      <p className="text-sm text-muted-foreground">মামলা নং: {c.caseNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/timeline?caseNumber=${c.caseNumber}`}>টাইমলাইন দেখুন</Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeCase(c.caseNumber)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Info className="w-8 h-8 mx-auto mb-2" />
                  <p>আপনি এখনও কোনো মামলা সংরক্ষণ করেননি।</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link href="/timeline">একটি মামলা ট্র্যাক করুন</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>সংরক্ষিত প্রশ্নোত্তর</CardTitle>
              <CardDescription>
                আপনি যে প্রশ্ন এবং উত্তরগুলি বুকমার্ক করেছেন সেগুলি এখানে রয়েছে৷
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedFaqs.length > 0 ? (
                savedFaqs.map((faq) => (
                   <div key={faq.id} className="rounded-lg border p-4">
                    <p className="font-semibold">{faq.question}</p>
                    <div className="flex text-sm text-muted-foreground gap-4 mt-2">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" /> {faq.answers.length} উত্তর
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" /> {faq.answers.reduce((acc, a) => acc + a.upvotes, 0)} আপভোট
                        </div>
                    </div>
                     <div className="flex gap-2 mt-4">
                       <Button asChild variant="outline" size="sm">
                         <Link href="/faq">প্রশ্নোত্তর দেখুন</Link>
                       </Button>
                       <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFaq(faq.id)}>
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                ))
              ) : (
                 <div className="text-center py-10 text-muted-foreground">
                  <Info className="w-8 h-8 mx-auto mb-2" />
                  <p>আপনি এখনও কোনো প্রশ্নোত্তর সংরক্ষণ করেননি।</p>
                   <Button asChild variant="link" className="mt-2">
                     <Link href="/faq">একটি প্রশ্ন জিজ্ঞাসা করুন</Link>
                   </Button>
                 </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
