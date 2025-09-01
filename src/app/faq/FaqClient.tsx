'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { faqData as initialFaqData } from '@/lib/dummy-data';
import type { FaqItem } from '@/types';
import { ThumbsUp, ThumbsDown, User, Bot, Sparkles, Send, Bookmark, Lightbulb, FileText, Gavel, MapPin } from 'lucide-react';
import { askLegalQuestion } from '@/ai/flows/community-legal-q-and-a';
import { legalToolRecommendation } from '@/ai/flows/legal-tool-recommendation';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function FaqClient() {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqData);
  const [newQuestion, setNewQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [savedFaqs, setSavedFaqs] = useLocalStorage<FaqItem[]>('savedFaqs', []);

  const handleAskQuestion = async () => {
    if (!newQuestion.trim()) return;

    setIsLoading(true);
    try {
      const [answerResponse, toolResponse] = await Promise.all([
        askLegalQuestion({ question: newQuestion }),
        legalToolRecommendation({ legalQuestion: newQuestion }),
      ]);
      
      const newFaqItem: FaqItem = {
        id: faqs.length + 1,
        question: newQuestion,
        tags: ['New', 'AI Answered'],
        timestamp: new Date().toISOString(),
        answers: [
          {
            id: Math.random(),
            content: answerResponse.answer,
            author: 'AI Bot',
            upvotes: 0,
            downvotes: 0,
            timestamp: new Date().toISOString(),
          },
        ],
      };
      
      const toolRecommendation = {
        ...toolResponse,
        content: `**Recommended Tool: ${toolResponse.toolRecommendation}**\n\n${toolResponse.suitabilityReasoning}`
      };
      
      // A bit of a hack to add the recommendation as a special answer
      (newFaqItem as any).recommendation = toolRecommendation;

      setFaqs([newFaqItem, ...faqs]);
      setNewQuestion('');
    } catch (error) {
      console.error('Error fetching AI answers:', error);
      toast({
        title: 'Error',
        description: 'Failed to get an answer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSaveFaq = (faq: FaqItem) => {
    const isSaved = savedFaqs.some(item => item.id === faq.id);
    if (isSaved) {
      setSavedFaqs(savedFaqs.filter(item => item.id !== faq.id));
      toast({ title: "Removed from Profile", description: "This Q&A has been removed from your saved items." });
    } else {
      setSavedFaqs([...savedFaqs, faq]);
      toast({ title: "Saved to Profile", description: "You can view this Q&A in your profile." });
    }
  };

  const getToolIcon = (toolName: string) => {
    if (toolName.toLowerCase().includes('summarizer')) return <FileText className="w-5 h-5 text-accent" />;
    if (toolName.toLowerCase().includes('timeline')) return <Gavel className="w-5 h-5 text-accent" />;
    if (toolName.toLowerCase().includes('finder')) return <MapPin className="w-5 h-5 text-accent" />;
    return <Lightbulb className="w-5 h-5 text-accent" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-2">Ask a New Question</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Can't find your answer? Ask our AI assistant.
          </p>
          <div className="flex gap-2">
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g., How do I file a consumer complaint?"
              disabled={isLoading}
            />
            <Button onClick={handleAskQuestion} disabled={isLoading}>
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Ask
            </Button>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={`item-${faq.id}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex-1">
                <h3 className="font-semibold text-base">{faq.question}</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {faq.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              {(faq as any).recommendation && (
                <Card className="mb-4 border-accent bg-accent/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        {getToolIcon((faq as any).recommendation.toolRecommendation)}
                      <div>
                        <h4 className="font-bold">Tool Recommendation: {(faq as any).recommendation.toolRecommendation}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{(faq as any).recommendation.suitabilityReasoning}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {faq.answers.map((answer) => (
                <div key={answer.id} className="border-t py-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      {answer.author === 'AI Bot' ? (
                        <Bot className="w-5 h-5 text-primary" />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{answer.author}</p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(answer.timestamp).toLocaleString()}
                      </p>
                      <p className="mt-2 text-foreground">{answer.content}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsUp className="w-4 h-4" /> {answer.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsDown className="w-4 h-4" /> {answer.downvotes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => toggleSaveFaq(faq)}>
                  <Bookmark className={`w-4 h-4 mr-2 ${savedFaqs.some(item => item.id === faq.id) ? 'text-accent fill-accent' : ''}`} />
                  {savedFaqs.some(item => item.id === faq.id) ? 'Saved' : 'Save'}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
