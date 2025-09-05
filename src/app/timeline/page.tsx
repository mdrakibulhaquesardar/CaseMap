
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
import useLocalStorage from '@/hooks/useLocalStorage';
import type { CaseTimeline } from '@/types';
import { caseTimelineData } from '@/lib/dummy-data';

export default function TimelinePage() {
    const [savedCases] = useLocalStorage<CaseTimeline[]>(
    'savedCases',
    Object.values(caseTimelineData).slice(0, 2)
  );

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            মামলার টাইমলাইন ভিউয়ার
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            আপনার মামলার নম্বর লিখে এর perjalanan এবং বর্তমান অবস্থা একটি దృశ్యమాన प्रतिनिधित्त्व দেখুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <Suspense fallback={
              <Card className="text-center py-20 flex flex-col items-center justify-center min-h-[400px]">
                <CardContent>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold">লোড হচ্ছে...</h3>
                  <p className="text-muted-foreground mt-2">মামলা টাইমলাইন লোড হচ্ছে</p>
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
                        সংরক্ষিত মামলা
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
                            <p>আপনি এখনও কোনো মামলা সংরক্ষণ করেননি।</p>
                        </div>
                        )}
                    </CardContent>
                </Card>
              <Card>
                <CardHeader>
                  <CardTitle>আরও সাহায্য প্রয়োজন?</CardTitle>
                  <CardDescription>
                    আপনার আইনি যাত্রায় সাহায্য করার জন্য অন্যান্য সরঞ্জামগুলি অন্বেষণ করুন।
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/faq">একটি কমিউনিটি প্রশ্ন জিজ্ঞাসা করুন</Link>
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

