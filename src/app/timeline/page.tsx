
'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import TimelineClient from './TimelineClient';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gavel, Info, MessageSquare, Loader2 } from 'lucide-react';
import type { CaseTimeline } from '@/types';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { collection, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';


export default function TimelinePage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const savedCasesRef = user ? query(collection(firestore, 'users', user.uid, 'savedCases')) : null;
  const [savedCasesSnapshot, loading] = useCollection(savedCasesRef);
  const savedCases = savedCasesSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id } as CaseTimeline)) || [];

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-left mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">
              মামলার টাইমলাইন
            </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-3xl">
            আপনার মামলার নম্বর দিয়ে অনুসন্ধান করে এর বর্তমান অবস্থা এবং অগ্রগতি একটি টাইমলাইনে দেখুন।
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <main className="lg:col-span-3">
              <Suspense fallback={
                <div className="text-center py-20 flex flex-col items-center justify-center min-h-[400px] border rounded-lg">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">লোড হচ্ছে...</h3>
                    <p className="text-muted-foreground mt-2">মামলার টাইমলাইন লোড হচ্ছে</p>
                </div>
              }>
                <TimelineClient />
              </Suspense>
            </main>
             <aside className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                  <div className="border rounded-lg">
                      <div className="p-6 border-b">
                          <h3 className="font-semibold flex items-center gap-2 text-lg">
                          <Gavel className="text-primary" />
                          সংরক্ষিত মামলা
                          </h3>
                      </div>
                      <div className="p-6">
                          {loading ? (
                            <div className="flex items-center justify-center py-6">
                              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                          ) : savedCases.length > 0 ? (
                          <div className="space-y-2">
                              {savedCases.map((c) => (
                              <Button
                                  key={c.caseNumber}
                                  variant="ghost"
                                  className="w-full justify-start h-auto py-2 px-3 text-left"
                                  asChild
                              >
                                  <Link href={`/timeline?caseNumber=${c.caseNumber}`}>
                                  <div>
                                      <p className="font-semibold leading-tight">{c.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                      মামলা নং: {c.caseNumber}
                                      </p>
                                  </div>
                                  </Link>
                              </Button>
                              ))}
                          </div>
                          ) : (
                          <div className="text-center py-6 text-sm text-muted-foreground">
                              <Info className="w-6 h-6 mx-auto mb-2" />
                              <p>আপনি এখনো কোনো মামলা সংরক্ষণ করেননি।</p>
                          </div>
                          )}
                      </div>
                  </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">আরও সাহায্য প্রয়োজন?</h3>
                  <p className="text-muted-foreground mb-4">
                    আপনার আইনি যাত্রায় সাহায্য করার জন্য আমাদের অন্যান্য টুলসগুলো দেখুন।
                  </p>
                    <Button className="w-full justify-start" asChild variant="outline">
                      <Link href="/faq">
                        <MessageSquare className="w-4 h-4 mr-2"/>
                        কমিউনিটিতে প্রশ্ন করুন
                      </Link>
                    </Button>
                </div>
              </div>
            </aside>
        </div>
      </div>
    </div>
  );
}
