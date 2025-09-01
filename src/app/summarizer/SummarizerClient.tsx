'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { summarizeLegalDocument } from '@/ai/flows/legal-document-summarization';
import { Sparkles, FileText, Bot } from 'lucide-react';

export default function SummarizerClient() {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const sampleText = "This agreement is made and entered into on this day, by and between the party of the first part, hereinafter referred to as the 'Lessor', and the party of the second part, hereinafter referred to as the 'Lessee'. The Lessor agrees to lease the premises located at the specified address under the terms and conditions set forth herein. The Lessee, in consideration of the lease, covenants to pay the monthly rent punctually and maintain the premises in good order and condition, reasonable wear and tear excepted. The term of this lease shall be for a period of twelve (12) months, commencing on the start date and terminating on the end date, unless renewed or terminated earlier in accordance with the provisions of this agreement. Any failure to comply with the terms of this lease by the Lessee shall constitute a breach of contract and may result in the termination of this agreement and subsequent eviction proceedings as permitted by law.";

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
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Your Legal Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your legal document text here..."
              className="min-h-[300px] text-base"
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-4">
               <Button variant="link" onClick={() => setDocumentText(sampleText)}>
                Use Sample Text
              </Button>
              <Button onClick={handleSummarize} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin mr-2" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Summarize in Bangla
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Bot className="w-6 h-6" />
              Simplified Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                <Sparkles className="w-10 h-10 text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">Our AI is reading your document...</p>
              </div>
            )}
            {summary && (
              <div className="prose prose-lg max-w-none text-foreground p-4 bg-muted rounded-md min-h-[300px]">
                <p lang="bn">{summary}</p>
              </div>
            )}
            {!isLoading && !summary && (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px] text-muted-foreground">
                 <p>Your simplified summary will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
