'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faqData as initialFaqData } from '@/lib/dummy-data';
import type { FaqItem } from '@/types';
import { ThumbsUp, ThumbsDown, User, Bot, Sparkles, Send, Bookmark, Lightbulb, FileText, Gavel, MapPin, MessageSquare } from 'lucide-react';
import { askLegalQuestion } from '@/ai/flows/community-legal-q-and-a';
import { legalToolRecommendation } from '@/ai/flows/legal-tool-recommendation';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Separator } from '@/components/ui/separator';

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
    <div className="w-full">
      <Card className="mb-8 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-lg mb-2">Ask a New Question</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Can't find your answer? Ask our AI assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g., How do I file a consumer complaint?"
              disabled={isLoading}
            />
            <Button onClick={handleAskQuestion} disabled={isLoading} className="w-full sm:w-auto">
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

      <div className="space-y-6">
        {faqs.map((faq) => (
          <Card key={faq.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
              <div className="flex gap-2 pt-2 flex-wrap">
                  {faq.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
              </div>
            </CardHeader>
            <CardContent>
              {(faq as any).recommendation && (
                <Card className="mb-4 border-accent bg-accent/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        {getToolIcon((faq as any).recommendation.toolRecommendation)}
                      <div>
                        <h4 className="font-bold text-sm">Tool Recommendation: {(faq as any).recommendation.toolRecommendation}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{(faq as any).recommendation.suitabilityReasoning}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-4">
                {faq.answers.map((answer) => (
                  <div key={answer.id} className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded-full mt-1">
                      {answer.author === 'AI Bot' ? (
                        <Bot className="w-5 h-5 text-primary" />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <p className="font-semibold text-sm">{answer.author}</p>
                        <p className="mt-1 text-foreground">{answer.content}</p>
                      </div>
                       <div className="flex items-center gap-2 mt-1">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground text-xs">
                          <ThumbsUp className="w-3 h-3" /> {answer.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground text-xs">
                          <ThumbsDown className="w-3 h-3" /> {answer.downvotes}
                        </Button>
                         <span className="text-xs text-muted-foreground">&middot;</span>
                         <p className="text-muted-foreground text-xs">
                          {new Date(answer.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <Separator className="my-0" />
            <CardFooter className="p-2">
                <Button variant="ghost" size="sm" className="w-1/2" onClick={() => toggleSaveFaq(faq)}>
                  <Bookmark className={`w-4 h-4 mr-2 ${savedFaqs.some(item => item.id === faq.id) ? 'text-accent fill-accent' : ''}`} />
                  {savedFaqs.some(item => item.id === faq.id) ? 'Saved' : 'Save'}
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm" className="w-1/2">
                    <MessageSquare className="w-4 h-4 mr-2"/>
                    Comment
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
