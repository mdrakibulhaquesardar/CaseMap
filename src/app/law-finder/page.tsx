import LawFinderClient from './LawFinderClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, MessagesSquare, Scale } from 'lucide-react';
import Link from 'next/link';

const popularCategories = [
  "দণ্ডবিধি, ১৮৬০", "দেওয়ানী কার্যবিধি, ১৯০৮", "সাক্ষ্য আইন, ১৮৭২", "চুক্তি আইন, ১৮৭২", "সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭", "ডিজিটাল নিরাপত্তা আইন, ২০১৮"
];

export default function LawFinderPage() {
  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">আইনের ধারা खोजকারী</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            বাংলাদেশের যেকোনো আইনের ধারা তার নম্বর বা নাম দিয়ে অনুসন্ধান করুন এবং বাংলায় বিস্তারিত ব্যাখ্যা পান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
             <div className="sticky top-20 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Scale className="text-primary"/> জনপ্রিয় বিভাগ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {popularCategories.map(tag => (
                            <Button key={tag} variant="outline" size="sm" asChild>
                                <Link href="#">{tag}</Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
          </aside>
          
          <main className="lg:col-span-2">
            <LawFinderClient />
          </main>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="text-accent" />
                    দ্রুত টিপস
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>সেরা ফলাফলের জন্য, সুনির্দিষ্ট হন। যেমন, "দন্ডবিধি ৩০২ ধারা"।</p>
                    <p>আপনি বিষয় দিয়েও অনুসন্ধান করতে পারেন, যেমন "চুরির শাস্তি"।</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>সম্পর্কিত টুলস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/summarizer">
                        <FileText className="w-4 h-4 text-primary"/> AI ডকুমেন্ট সারসংক্ষেপ
                       </Link>
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/faq">
                        <MessagesSquare className="w-4 h-4 text-primary"/> কমিউনিটি প্রশ্নোত্তর
                       </Link>
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
