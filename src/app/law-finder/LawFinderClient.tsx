'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { findLawSection } from '@/ai/flows/law-section-finder';
import { Sparkles, Search, Loader2, BookOpen, Bot } from 'lucide-react';

interface LawSectionResult {
  sectionTitle: string;
  sectionDetails: string;
}

export default function LawFinderClient() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<LawSectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter a law section number or name.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const response = await findLawSection({ query });
      setResult(response);
    } catch (error) {
      console.error('Error finding law section:', error);
      toast({
        title: 'Error',
        description: 'Failed to find the law section. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-lg mb-2">Search for a Law Section</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Enter a section number (e.g., "দন্ডবিধি ১৮৬০ এর ৩০২ ধারা") or a topic (e.g., "চুরির শাস্তি").
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., দন্ডবিধি ৩০২"
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Explanation
          </CardTitle>
          <CardDescription>
            The explanation for your searched law section will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[250px] p-4 bg-muted rounded-md">
              <Sparkles className="w-10 h-10 text-primary animate-spin" />
              <p className="mt-4 text-muted-foreground">Our AI is searching the law books...</p>
            </div>
          ) : result ? (
            <div className="prose prose-lg max-w-none text-foreground p-4 bg-muted rounded-md min-h-[250px]">
              <h3 className="font-bold" lang="bn">{result.sectionTitle}</h3>
              <p lang="bn">{result.sectionDetails}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[250px] text-muted-foreground p-4 bg-muted/50 rounded-md">
              <BookOpen className="w-12 h-12 mb-4" />
              <h3 className="font-semibold text-lg">Ready to Search</h3>
              <p className="max-w-xs">Enter a law section above to see its details.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
