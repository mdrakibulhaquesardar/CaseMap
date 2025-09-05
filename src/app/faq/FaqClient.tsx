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
import { ThumbsUp, ThumbsDown, User, Bot, Sparkles, Send, Bookmark, Lightbulb, FileText, Gavel, MapPin, MessageSquare, MoreHorizontal } from 'lucide-react';
import { askLegalQuestion } from '@/ai/flows/community-legal-q-and-a';
import { legalToolRecommendation } from '@/ai/flows/legal-tool-recommendation';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ITEMS_PER_PAGE = 5;

export default function FaqClient() {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqData);
  const [newQuestion, setNewQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [savedFaqs, setSavedFaqs] = useLocalStorage<FaqItem[]>('savedFaqs', []);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
  const currentFaqs = faqs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        tags: ['নতুন', 'AI উত্তর'],
        timestamp: new Date().toISOString(),
        author: { name: "বর্তমান ব্যবহারকারী", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
        answers: [
          {
            id: Math.random(),
            content: answerResponse.answer,
            author: 'AI বট',
            upvotes: 0,
            downvotes: 0,
            timestamp: new Date().toISOString(),
          },
        ],
      };
      
      const toolRecommendation = {
        ...toolResponse,
        content: `**প্রস্তাবিত টুল: ${toolResponse.toolRecommendation}**\n\n${toolResponse.suitabilityReasoning}`
      };
      
      (newFaqItem as any).recommendation = toolRecommendation;

      setFaqs([newFaqItem, ...faqs]);
      setNewQuestion('');
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching AI answers:', error);
      toast({
        title: 'ত্রুটি',
        description: 'উত্তর পেতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।',
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
      toast({ title: "প্রোফাইল থেকে সরানো হয়েছে", description: "এই প্রশ্ন-উত্তর আপনার সংরক্ষিত তালিকা থেকে সরানো হয়েছে।" });
    } else {
      setSavedFaqs([...savedFaqs, faq]);
      toast({ title: "প্রোফাইলে সংরক্ষিত", description: "আপনি এই প্রশ্ন-উত্তর আপনার প্রোফাইলে দেখতে পারেন।" });
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
          <h3 className="font-semibold text-lg mb-2">একটি নতুন প্রশ্ন করুন</h3>
          <p className="text-muted-foreground text-sm mb-4">
            আপনার উত্তর খুঁজে পাচ্ছেন না? আমাদের AI সহকারীকে জিজ্ঞাসা করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="যেমন, আমি কীভাবে ভোক্তা অভিযোগ দায়ের করব?"
              disabled={isLoading}
            />
            <Button onClick={handleAskQuestion} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              জিজ্ঞাসা করুন
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {currentFaqs.map((faq) => (
          <Card key={faq.id} className="shadow-sm">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={faq.author.avatar} alt={faq.author.name} />
                            <AvatarFallback>{faq.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{faq.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(faq.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>রিপোর্ট করুন</DropdownMenuItem>
                            <DropdownMenuItem>শেয়ার করুন</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-medium mb-4">{faq.question}</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                    {faq.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                        {tag}
                        </Badge>
                    ))}
                </div>

              {(faq as any).recommendation && (
                <Card className="mb-4 border-accent bg-accent/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        {getToolIcon((faq as any).recommendation.toolRecommendation)}
                      <div>
                        <h4 className="font-bold text-sm">টুল 추천: {(faq as any).recommendation.toolRecommendation}</h4>
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
                      {answer.author === 'AI বট' ? (
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
                  {savedFaqs.some(item => item.id === faq.id) ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm" className="w-1/2">
                    <MessageSquare className="w-4 h-4 mr-2"/>
                    মতামত
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(p => Math.max(1, p - 1));
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
            >
              পূর্ববর্তী
            </PaginationPrevious>
          </PaginationItem>
           <PaginationItem>
            <span className="p-2 text-sm">
                পেজ {currentPage} এর {totalPages}
            </span>
           </PaginationItem>
          <PaginationItem>
            <PaginationNext 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(p => Math.min(totalPages, p + 1));
              }}
               className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
            >
              পরবর্তী
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
