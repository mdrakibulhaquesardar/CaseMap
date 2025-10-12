
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
import { Gavel, Info } from 'lucide-react';
import type { CaseTimeline } from '@/types';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { collection, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function TimelinePage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const savedCasesRef = user ? query(collection(firestore, 'users', user.uid, 'savedCases')) : null;
  const [savedCasesSnapshot] = useCollection(savedCasesRef);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <Suspense fallback={
              <Card className="text-center py-20 flex flex-col items-center justify-center min-h-[400px]">
                <CardContent>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold">Loading...</h3>
                  <p className="text-muted-foreground mt-2">Loading case timeline</p>
                </CardContent>
              </Card>
            }>
              <TimelineClient />
            </Suspense>
          </main>
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Gavel className="text-primary" />
                        Saved Cases
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {savedCases.length > 0 ? (
                        <div className="space-y-2">
                            {savedCases.map((c) => (
                            <Button
                                key={c.caseNumber}
                                variant="ghost"
                                className="w-full justify-start h-auto py-2"
                                asChild
                            >
                                <Link href={`/timeline?caseNumber=${c.caseNumber}`}>
                                <div>
                                    <p className="font-semibold text-left">{c.title}</p>
                                    <p className="text-xs text-muted-foreground text-left">
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
                  <Button className="w-full" asChild>
                    <Link href="/faq">Ask a Community Question</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
