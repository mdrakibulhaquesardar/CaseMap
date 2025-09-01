import Link from 'next/link';
import TimelineClient from './TimelineClient';
import SavedCases from './SavedCases';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function TimelinePage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Case Timeline Viewer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Enter your case number to see a visual representation of its journey
            and current status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <TimelineClient />
          </main>
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <SavedCases />
              <Card>
                <CardHeader>
                  <CardTitle>Need More Help?</CardTitle>
                  <CardDescription>
                    Explore other tools to help your legal journey.
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
