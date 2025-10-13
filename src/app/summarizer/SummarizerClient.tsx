'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { summarizeLegalDocument } from '@/ai/flows/legal-document-summarization';
import { Sparkles, FileText, Bot, Clipboard, Loader2, Languages } from 'lucide-react';

export default function SummarizerClient() {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const sampleText = "This agreement is made and entered into on this day, by and between the party of the first part, hereinafter referred to as the 'Lessor', and the party of the second part, hereinafter referred to as the 'Lessee'. The Lessor hereby agrees to lease the premises located at the address specified herein, under the terms and conditions set forth. The Lessee, in consideration of the lease, covenants to pay the monthly rent in a timely manner and to maintain the premises in good order and condition, reasonable wear and tear excepted. The term of this lease shall be for a period of twelve (12) months, commencing on the start date and ending on the termination date, unless renewed or terminated sooner pursuant to the provisions of this agreement. Any failure by the Lessee to comply with the terms of this lease shall be deemed a breach of contract and may result in the termination of this agreement and subsequent eviction proceedings as permitted by law.";

  const handleSummarize = async () => {
    if (!documentText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please paste some legal text to summarize.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeLegalDocument({ documentText });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error summarizing document:', error);
      toast({
        title: 'Error',
        description: 'Failed to summarize the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Original Document
          </CardTitle>
          <CardDescription>
            Paste your legal document below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste the text of your legal document here..."
            className="min-h-[350px] text-base"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
             <Button variant="outline" onClick={() => setDocumentText(sampleText)} disabled={isLoading}>
              <Clipboard className="w-4 h-4 mr-2" />
              Use Sample Text
            </Button>
            <Button onClick={handleSummarize} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Summarize in English
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Bot className="w-6 h-6" />
            AI-Powered Simplified Summary
          </CardTitle>
           <CardDescription>
            The simplified summary of your document will appear below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] p-4 bg-muted rounded-md">
              <Sparkles className="w-10 h-10 text-primary animate-spin" />
              <p className="mt-4 text-muted-foreground">Our AI is analyzing your document...</p>
              <p className="text-sm text-muted-foreground">This may take a few moments.</p>
            </div>
          ) : summary ? (
            <div className="prose prose-lg max-w-none text-foreground p-4 bg-muted rounded-md min-h-[350px]">
              <p>{summary}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[350px] text-muted-foreground p-4 bg-muted/50 rounded-md">
               <Languages className="w-12 h-12 mb-4" />
               <h3 className="font-semibold text-lg">Waiting for document</h3>
               <p className="max-w-xs">Your simplified summary in English will be generated here once you provide a document.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
