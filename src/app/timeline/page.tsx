
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Case Timeline Viewer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Enter your case number to see a visual representation of its journey and current status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                        <Gavel className="text-primary" />
                        Saved Cases
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                    Case No: {c.caseNumber}
                                    </p>
                                </div>
                                </Link>
                            </Button>
                            ))}
                        </div>
                        ) : (
                        <div className="text-center py-6 text-sm text-muted-foreground">
                            <Info className="w-6 h-6 mx-auto mb-2" />
                            <p>You have not saved any cases yet.</p>
                        </div>
                        )}
                    </CardContent>
                </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Need more help?</CardTitle>
                  <CardDescription>
                    Explore other tools to help you on your legal journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full justify-start" asChild variant="outline">
                    <Link href="/faq">
                      <MessageSquare className="w-4 h-4 mr-2"/>
                      Ask a Community Question
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
          <main className="lg:col-span-3">
            <Suspense fallback={
              <Card className="text-center py-20 flex flex-col items-center justify-center min-h-[400px]">
                <CardContent>
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Loading...</h3>
                  <p className="text-muted-foreground mt-2">Loading case timeline</p>
                </CardContent>
              </Card>
            }>
              <TimelineClient />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
