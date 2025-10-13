'use client';

import { useState } from 'react';
import LawFinderClient from './LawFinderClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, MessagesSquare, Scale } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { findLawSection } from '@/ai/flows/law-section-finder';

const popularCategories = [
  "দণ্ডবিধি, ১৮৬০", "দেওয়ানী কার্যবিধি, ১৯০৮", "সাক্ষ্য আইন, ১৮৭২", "চুক্তি আইন, ১৮৭২", "সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭", "ডিজিটাল নিরাপত্তা আইন, ২০১৮"
];

interface LawSectionResult {
  sectionTitle: string;
  sectionDetails: string;
}

export default function LawFinderPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<LawSectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      toast({
        title: 'ইনপুট প্রয়োজন',
        description: 'অনুগ্রহ করে একটি আইন বিভাগ নম্বর বা নাম লিখুন।',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const response = await findLawSection({ query: searchQuery });
      setResult(response);
    } catch (error) {
      console.error('Error finding law section:', error);
      toast({
        title: 'ত্রুটি',
        description: 'আইন বিভাগটি খুঁজে পেতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onCategoryClick = (category: string) => {
    setQuery(category);
    handleSearch(category);
  }

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">আইন বিভাগ ফাইন্ডার</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            বাংলাদেশের যেকোনো আইন বিভাগের নম্বর বা বিষয় দ্বারা অনুসন্ধান করুন এবং ইংরেজিতে একটি বিস্তারিত ব্যাখ্যা পান।
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
                            <Button key={tag} variant="outline" size="sm" onClick={() => onCategoryClick(tag)}>
                                {tag}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
          </aside>
          
          <main className="lg:col-span-2">
            <LawFinderClient 
              query={query}
              setQuery={setQuery}
              result={result}
              isLoading={isLoading}
              handleSearch={() => handleSearch()}
            />
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
                    <p>সেরা ফলাফলের জন্য, নির্দিষ্ট হন। যেমন, "দণ্ডবিধির ৩০২ ধারা"।</p>
                    <p>আপনি বিষয় দ্বারাও অনুসন্ধান করতে পারেন, যেমন "চুরির শাস্তি"।</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>সম্পর্কিত সরঞ্জাম</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/summarizer">
                        <FileText className="w-4 h-4 text-primary"/> এআই ডকুমেন্ট সারাংশকারী
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
