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
    toast({ title: "Case removed successfully."});
  };

  const removeFaq = (id: number) => {
    setSavedFaqs(savedFaqs.filter(faq => faq.id !== id));
    toast({ title: "Q&A removed successfully."});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cases">
            <Gavel className="w-4 h-4 mr-2" />
            Saved Cases ({savedCases.length})
          </TabsTrigger>
          <TabsTrigger value="faqs">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved Q&As ({savedFaqs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Saved Cases</CardTitle>
              <CardDescription>
                Here are the case timelines you've saved for quick access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedCases.length > 0 ? (
                savedCases.map((c) => (
                  <div key={c.caseNumber} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-semibold">{c.title}</p>
                      <p className="text-sm text-muted-foreground">Case No: {c.caseNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/timeline?caseNumber=${c.caseNumber}`}>View Timeline</Link>
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
                  <p>You haven't saved any cases yet.</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link href="/timeline">Track a case</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Saved Q&As</CardTitle>
              <CardDescription>
                Here are the questions and answers you've bookmarked.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedFaqs.length > 0 ? (
                savedFaqs.map((faq) => (
                   <div key={faq.id} className="rounded-lg border p-4">
                    <p className="font-semibold">{faq.question}</p>
                    <div className="flex text-sm text-muted-foreground gap-4 mt-2">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" /> {faq.answers.length} Answers
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" /> {faq.answers.reduce((acc, a) => acc + a.upvotes, 0)} Upvotes
                        </div>
                    </div>
                     <div className="flex gap-2 mt-4">
                       <Button asChild variant="outline" size="sm">
                         <Link href="/faq">View Q&A</Link>
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
                  <p>You haven't saved any Q&As yet.</p>
                   <Button asChild variant="link" className="mt-2">
                     <Link href="/faq">Ask a question</Link>
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