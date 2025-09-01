'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { CaseTimeline } from '@/types';
import { Gavel, Info } from 'lucide-react';
import Link from 'next/link';
import { caseTimelineData } from '@/lib/dummy-data';

export default function SavedCases() {
  const [savedCases, setSavedCases] = useLocalStorage<CaseTimeline[]>(
    'savedCases',
    Object.values(caseTimelineData).slice(0, 2)
  );

  return (
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
            <p>You haven&apos;t saved any cases yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
