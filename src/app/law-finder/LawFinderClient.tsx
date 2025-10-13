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

interface LawFinderClientProps {
  query: string;
  setQuery: (query: string) => void;
  result: LawSectionResult | null;
  isLoading: boolean;
  handleSearch: () => void;
}

export default function LawFinderClient({
    query,
    setQuery,
    result,
    isLoading,
    handleSearch,
}: LawFinderClientProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-lg mb-2">Search Law Section</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Enter a section number (e.g., "Section 302 of Penal Code 1860") or a topic (e.g., "punishment for theft").
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Penal Code 302"
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
            The explanation of your searched law section will be displayed here.
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
              <h3 className="font-bold">{result.sectionTitle}</h3>
              <p>{result.sectionDetails}</p>
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
