'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Search, Loader2, BookOpen, Bot, FileCheck2, MessageSquare, Scale } from 'lucide-react';
import Link from 'next/link';

interface LawSectionResult {
  sectionTitle: string;
  sectionDetails: string;
}

interface LawFinderClientProps {
  query: string;
  setQuery: (query: string) => void;
  result: LawSectionResult | null;
  isLoading: boolean;
  handleSearch: () => void;
  onCategoryClick: (category: string) => void;
}

const popularCategories = [
  "দণ্ডবিধি, ১৮৬০", "দেওয়ানী কার্যবিধি, ১৯০৮", "সাক্ষ্য আইন, ১৮৭২", "চুক্তি আইন, ১৮৭২", "সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭", "ডিজিটাল নিরাপত্তা আইন, ২০১৮"
];

export default function LawFinderClient({
    query,
    setQuery,
    result,
    isLoading,
    handleSearch,
    onCategoryClick,
}: LawFinderClientProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-lg mb-2">আইনের ধারা খুঁজুন</h3>
          <p className="text-muted-foreground text-sm mb-4">
            একটি ধারার নম্বর (যেমন, "দণ্ডবিধি ১৮৬০-এর ৩০২ ধারা") বা বিষয় (যেমন, "চুরির শাস্তি") লিখুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="যেমন, দণ্ডবিধি ৩০২"
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              অনুসন্ধান
            </Button>
          </div>
           <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">অথবা জনপ্রিয় আইন থেকে বেছে নিন:</p>
              <div className="flex flex-wrap gap-2">
                  {popularCategories.map(tag => (
                      <Button key={tag} variant="outline" size="sm" onClick={() => onCategoryClick(tag)}>
                          {tag}
                      </Button>
                  ))}
              </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI ব্যাখ্যা
          </CardTitle>
          <CardDescription>
            আপনার খোঁজা আইনের ধারার ব্যাখ্যা নিচে দেখানো হবে।
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[250px] p-4 bg-muted rounded-md">
              <Sparkles className="w-10 h-10 text-primary animate-spin" />
              <p className="mt-4 text-muted-foreground">AI আপনার জন্য আইনের বই ঘাঁটছে...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none text-foreground p-6 bg-muted rounded-md min-h-[250px] border">
                <h3 className="font-bold text-xl mb-4">{result.sectionTitle}</h3>
                <p className="text-base leading-relaxed">{result.sectionDetails}</p>
              </div>
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className='text-lg'>সম্পর্কিত বিষয় ও পরবর্তী ধাপ</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
                    <div className='p-4 bg-muted/50 rounded-lg'>
                        <FileCheck2 className='mx-auto h-8 w-8 text-primary mb-2'/>
                        <h4 className='font-semibold'>প্রাসঙ্গিক ধারা</h4>
                        <p className='text-sm text-muted-foreground'>এই আইনের অন্যান্য গুরুত্বপূর্ণ ধারাগুলো সম্পর্কে জানুন।</p>
                    </div>
                     <div className='p-4 bg-muted/50 rounded-lg'>
                        <Scale className='mx-auto h-8 w-8 text-primary mb-2'/>
                        <h4 className='font-semibold'>উদাহরণ</h4>
                        <p className='text-sm text-muted-foreground'>বাস্তব উদাহরণ দেখুন যা এই আইনটিকে বুঝতে সাহায্য করবে।</p>
                    </div>
                     <div className='p-4 bg-muted/50 rounded-lg'>
                        <MessageSquare className='mx-auto h-8 w-8 text-primary mb-2'/>
                        <h4 className='font-semibold'>প্রশ্ন করুন</h4>
                        <p className='text-sm text-muted-foreground'>এই আইন সম্পর্কে আরও প্রশ্ন থাকলে কমিউনিটিতে জিজ্ঞাসা করুন।</p>
                        <Button asChild variant="link" size="sm" className='mt-1'>
                          <Link href={`/faq?q=${encodeURIComponent(query)}`}>এখানে ক্লিক করুন</Link>
                        </Button>
                    </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[250px] text-muted-foreground p-4 bg-muted/50 rounded-md">
              <BookOpen className="w-12 h-12 mb-4" />
              <h3 className="font-semibold text-lg">অনুসন্ধানের জন্য প্রস্তুত</h3>
              <p className="max-w-xs">কোনো আইনের ধারার বিবরণ দেখতে উপরে সার্চ করুন।</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
