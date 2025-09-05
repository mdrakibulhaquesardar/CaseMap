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
            মামলার টাইমলাইন ভিউয়ার
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            আপনার মামলার নম্বর লিখে এর perjalanan এবং বর্তমান অবস্থা একটি దృశ్యమాన प्रतिनिधित्त्व দেখুন।
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
