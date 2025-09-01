'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Info, Bookmark } from 'lucide-react';
import CaseTimelineDisplay from './CaseTimeline';
import { caseTimelineData } from '@/lib/dummy-data';
import type { CaseTimeline } from '@/types';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function TimelineClient() {
  const searchParams = useSearchParams();
  const [caseNumber, setCaseNumber] = useState('');
  const [foundCase, setFoundCase] = useState<CaseTimeline | null>(null);
  const { toast } = useToast();
  const [savedCases, setSavedCases] = useLocalStorage<CaseTimeline[]>('savedCases', []);

  useEffect(() => {
    const caseNumberFromQuery = searchParams.get('caseNumber');
    if (caseNumberFromQuery) {
      setCaseNumber(caseNumberFromQuery);
      handleSearch(caseNumberFromQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = (cn: string) => {
    const result = caseTimelineData[cn];
    if (result) {
      setFoundCase(result);
    } else {
      setFoundCase(null);
      toast({
        title: 'Case Not Found',
        description: 'Please check the case number and try again. Use 12345 or 67890 for a demo.',
        variant: 'destructive',
      });
    }
  };
  
  const onSearchClick = () => {
    if(!caseNumber) return;
    handleSearch(caseNumber);
  };

  const toggleSaveCase = () => {
    if (!foundCase) return;
    const isSaved = savedCases.some(c => c.caseNumber === foundCase.caseNumber);
    if (isSaved) {
      setSavedCases(savedCases.filter(c => c.caseNumber !== foundCase.caseNumber));
      toast({ title: "Removed from Profile", description: "This case has been removed from your saved items." });
    } else {
      setSavedCases([...savedCases, foundCase]);
      toast({ title: "Saved to Profile", description: "You can view this case in your profile." });
    }
  };

  const isCaseSaved = foundCase ? savedCases.some(c => c.caseNumber === foundCase.caseNumber) : false;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your case number (e.g., 12345)"
                className="pl-10"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearchClick()}
              />
            </div>
            <Button onClick={onSearchClick} className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search Case
            </Button>
          </div>
        </CardContent>
      </Card>

      {foundCase ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{foundCase.title}</CardTitle>
                <CardDescription>Case Number: {foundCase.caseNumber}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={toggleSaveCase}>
                <Bookmark className={`w-4 h-4 mr-2 ${isCaseSaved ? 'text-accent fill-accent' : ''}`} />
                {isCaseSaved ? 'Saved' : 'Save Case'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CaseTimelineDisplay timeline={foundCase.timeline} />
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center py-20">
          <CardContent>
            <Info className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Track Your Case</h3>
            <p className="text-muted-foreground mt-2">
              Enter a case number above to see its timeline.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
