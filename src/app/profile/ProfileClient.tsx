
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Gavel, Trash2, Info, MessageSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, deleteDoc, query } from 'firebase/firestore';
import type { CaseTimeline, FaqItem } from '@/types';


export default function ProfileClient() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const savedCasesRef = user ? query(collection(firestore, 'users', user.uid, 'savedCases')) : null;
  const [savedCasesSnapshot] = useCollection(savedCasesRef);
  const savedCases = savedCasesSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id } as CaseTimeline)) || [];

  const savedFaqsRef = user ? query(collection(firestore, 'users', user.uid, 'savedFaqs')) : null;
  const [savedFaqsSnapshot] = useCollection(savedFaqsRef);
  const savedFaqs = savedFaqsSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id } as FaqItem)) || [];


  const removeCase = async (caseId: string) => {
    if (!user) return;
    await deleteDoc(doc(firestore, 'users', user.uid, 'savedCases', caseId));
    toast({ title: "মামলাটি সফলভাবে সরানো হয়েছে।"});
  };

  const removeFaq = async (faqId: string) => {
    if (!user) return;
    await deleteDoc(doc(firestore, 'users', user.uid, 'savedFaqs', faqId));
    toast({ title: "প্রশ্নোত্তরটি সফলভাবে সরানো হয়েছে।"});
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
                আপনার সংরক্ষিত মামলার টাইমলাইনগুলো এখানে দেখুন।
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
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeCase(c.id!)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Info className="w-8 h-8 mx-auto mb-2" />
                  <p>আপনি এখনো কোনো মামলা সংরক্ষণ করেননি।</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link href="/timeline">একটি মামলা অনুসরণ করুন</Link>
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
                আপনার বুকমার্ক করা প্রশ্ন এবং উত্তরগুলো এখানে দেখুন।
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedFaqs.length > 0 ? (
                savedFaqs.map((faq) => (
                   <div key={faq.id} className="rounded-lg border p-4">
                    <p className="font-semibold">{faq.question}</p>
                    <div className="flex text-sm text-muted-foreground gap-4 mt-2">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" /> {faq.answers.length} টি উত্তর
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" /> {faq.answers.reduce((acc, a) => acc + a.upvotes, 0)} টি আপভোট
                        </div>
                    </div>
                     <div className="flex gap-2 mt-4">
                       <Button asChild variant="outline" size="sm">
                         <Link href={`/faq#${faq.id}`}>প্রশ্নোত্তর দেখুন</Link>
                       </Button>
                       <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFaq(faq.id!)}>
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                ))
              ) : (
                 <div className="text-center py-10 text-muted-foreground">
                  <Info className="w-8 h-8 mx-auto mb-2" />
                  <p>আপনি এখনো কোনো প্রশ্নোত্তর সংরক্ষণ করেননি।</p>
                   <Button asChild variant="link" className="mt-2">
                     <Link href="/faq">একটি প্রশ্ন করুন</Link>
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
