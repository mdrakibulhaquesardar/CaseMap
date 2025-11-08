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
        title: 'ইনপুট প্রয়োজন',
        description: 'অনুগ্রহ করে আইনের কোনো ধারা বা বিষয় লিখুন।',
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
      console.error('আইনের ধারা খুঁজতে সমস্যা হয়েছে:', error);
      toast({
        title: 'ত্রুটি',
        description: 'আইনের ধারাটি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
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
          <h1 className="text-4xl md:text-5xl font-bold font-headline">আইন অনুসন্ধান</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            বাংলাদেশের যেকোনো আইনের ধারা বা বিষয় লিখে সার্চ করুন এবং সহজ বাংলায় তার বিস্তারিত ব্যাখ্যা পান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            <LawFinderClient 
              query={query}
              setQuery={setQuery}
              result={result}
              isLoading={isLoading}
              handleSearch={() => handleSearch()}
              onCategoryClick={onCategoryClick}
            />
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="text-accent" />
                    দ্রুত পরামর্শ
                </h3>
                <div className="text-sm text-muted-foreground space-y-2">
                    <p>সেরা ফলাফলের জন্য নির্দিষ্ট হন। যেমন, "দণ্ডবিধির ৩০২ ধারা"।</p>
                    <p>আপনি বিষয় দিয়েও খুঁজতে পারেন, যেমন "চুরির শাস্তি"।</p>
                </div>
              </div>
               <div className="p-6 border rounded-lg">
                <h3 className="text-base font-semibold mb-4">অন্যান্য টুলস</h3>
                <div className="space-y-2">
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/summarizer">
                        <FileText className="w-4 h-4 text-primary"/> AI নথি সারসংক্ষেপ
                       </Link>
                   </Button>
                   <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                       <Link href="/faq">
                        <MessagesSquare className="w-4 h-4 text-primary"/> কমিউনিটি প্রশ্নোত্তর
                       </Link>
                   </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
