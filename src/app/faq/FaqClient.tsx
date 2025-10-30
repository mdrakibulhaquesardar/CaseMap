
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FaqItem, FaqAnswer } from '@/types';
import { Sparkles, Send, Bookmark, Lightbulb, FileText, Gavel, MapPin, ArrowBigUp, ArrowBigDown, Bot, Edit } from 'lucide-react';
import { askLegalQuestion } from '@/ai/flows/community-legal-q-and-a';
import { legalToolRecommendation } from '@/ai/flows/legal-tool-recommendation';
import { useToast } from '@/hooks/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp, query, orderBy, doc, setDoc, deleteDoc, getDocs, where, writeBatch, getDoc, increment } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import {
  Discussion,
  DiscussionBody,
  DiscussionContent,
  DiscussionExpand,
  DiscussionItem,
  DiscussionReplies,
  DiscussionTitle,
} from "@/components/ui/discussion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';


const ITEMS_PER_PAGE = 5;

const FaqSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-4 p-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        ))}
    </div>
);


export default function FaqClient() {
  const searchParams = useSearchParams();
  const [newQuestion, setNewQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();
  const firestore = useFirestore();

  const faqsRef = query(collection(firestore, 'faqs'), orderBy('timestamp', 'desc'));
  const [faqsSnapshot, loading] = useCollection(faqsRef);
  
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [defaultOpenValues, setDefaultOpenValues] = useState<string[]>([]);
  
  useEffect(() => {
    const queryQuestion = searchParams.get('q');
    if (queryQuestion) {
      setNewQuestion(decodeURIComponent(queryQuestion));
    }
  }, [searchParams]);

  useEffect(() => {
    if (faqsSnapshot) {
      const faqsData = faqsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as FaqItem));
      setFaqs(faqsData);
    }
  }, [faqsSnapshot]);

  useEffect(() => {
    if (faqs.length > 0) {
      setDefaultOpenValues(faqs.map(faq => faq.id));
    }
  }, [faqs]);

  const savedFaqsRef = user ? query(collection(firestore, 'users', user.uid, 'savedFaqs')) : null;
  const [savedFaqsSnapshot] = useCollection(savedFaqsRef);
  const savedFaqs = savedFaqsSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id, faqId: doc.data().id } as FaqItem & {faqId: string})) || [];

  const userVotesRef = user ? query(collection(firestore, 'users', user.uid, 'userVotes')) : null;
  const [userVotesSnapshot] = useCollection(userVotesRef);
  const userVotes = userVotesSnapshot?.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().vote;
    return acc;
  }, {} as {[key: string]: 'up' | 'down'});


  const totalPages = Math.max(1, Math.ceil(faqs.length / ITEMS_PER_PAGE));
  const currentFaqs = faqs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAskQuestion = async () => {
    if (!newQuestion.trim() || !user) return;

    setIsLoading(true);
    try {
      const [answerResponse, toolResponse] = await Promise.all([
        askLegalQuestion({ question: newQuestion }),
        legalToolRecommendation({ legalQuestion: newQuestion }),
      ]);
      
      const newFaqItem: Omit<FaqItem, 'id'> = {
        question: newQuestion,
        tags: ['নতুন প্রশ্ন', 'AI উত্তর'],
        timestamp: serverTimestamp(),
        author: { name: user.displayName || "ব্যবহারকারী", avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}` },
        answers: [
          {
            id: Math.random().toString(),
            content: answerResponse.answer,
            authorUid: 'ai-bot',
            authorName: 'AI বট',
            authorAvatar: '',
            upvotes: 0,
            downvotes: 0,
            timestamp: new Date().toISOString(),
          },
        ],
        recommendation: {
          ...toolResponse,
          content: `**প্রস্তাবিত টুল: ${toolResponse.toolRecommendation}**\n\n${toolResponse.suitabilityReasoning}`
        }
      };

      await addDoc(collection(firestore, 'faqs'), newFaqItem);
      
      setNewQuestion('');
      setCurrentPage(1);
    } catch (error) {
      console.error('AI উত্তর আনতে সমস্যা হয়েছে:', error);
      toast({
        title: 'ত্রুটি',
        description: 'উত্তর পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSaveFaq = async (faq: FaqItem) => {
    if (!user) {
        toast({ title: "প্রশ্ন সংরক্ষণ করতে লগইন করুন।", variant: "destructive" });
        return;
    }
    const savedFaqsCollection = collection(firestore, 'users', user.uid, 'savedFaqs');
    const q = query(savedFaqsCollection, where("id", "==", faq.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(firestore, 'users', user.uid, 'savedFaqs', docToDelete.id));
        toast({ title: "সংরক্ষণ থেকে সরানো হয়েছে", description: "প্রশ্নোত্তরটি আপনার তালিকা থেকে সরানো হয়েছে।" });
    } else {
        const faqToSave = { ...faq };
        if (faqToSave.id) {
          await addDoc(collection(firestore, 'users', user.uid, 'savedFaqs'), {
            ...faqToSave,
            originalId: faq.id
          });
        }
        
        toast({ title: "সংরক্ষিত হয়েছে", description: "আপনি আপনার প্রোফাইলে এই প্রশ্নোত্তর দেখতে পারেন।" });
    }
  };

    const handleVote = async (faqId: string, answerId: string, authorUid: string, voteType: 'up' | 'down') => {
        if (!user) {
            toast({ title: "ভোট দিতে লগইন করুন।", variant: "destructive" });
            return;
        }

        const voteId = `${faqId}_${answerId}`;
        const userVoteRef = doc(firestore, 'users', user.uid, 'userVotes', voteId);
        const faqRef = doc(firestore, 'faqs', faqId);
        const answerAuthorRef = authorUid !== 'ai-bot' ? doc(firestore, 'users', authorUid) : null;

        try {
            const batch = writeBatch(firestore);
            const currentVote = userVotes[voteId];

            const faqDoc = await getDoc(faqRef);
            if (!faqDoc.exists()) return;

            const faqData = faqDoc.data() as FaqItem;
            const answerIndex = faqData.answers.findIndex(a => a.id === answerId);
            if (answerIndex === -1) return;

            const answer = faqData.answers[answerIndex];
            let upvotes = answer.upvotes;
            let downvotes = answer.downvotes;
            let pointChange = 0;

            if (currentVote === voteType) { // Undoing vote
                if (voteType === 'up') {
                  upvotes--;
                  pointChange = -1;
                } else {
                  downvotes--;
                  pointChange = 1;
                }
                batch.delete(userVoteRef);
            } else { // New vote or changing vote
                if (currentVote === 'up') {
                  upvotes--;
                  pointChange = -1;
                }
                if (currentVote === 'down') {
                  downvotes--;
                  pointChange = 1;
                }
                
                if (voteType === 'up') {
                  upvotes++;
                  pointChange += 1;
                } else {
                  downvotes++;
                  pointChange -= 1;
                }
                
                batch.set(userVoteRef, { vote: voteType });
            }

            const newAnswers = [...faqData.answers];
            newAnswers[answerIndex] = { ...answer, upvotes, downvotes };
            batch.update(faqRef, { answers: newAnswers });

            if (answerAuthorRef && pointChange !== 0) {
              batch.set(answerAuthorRef, { points: increment(pointChange) }, { merge: true });
            }

            await batch.commit();

        } catch (error) {
            console.error("ভোট দিতে সমস্যা হয়েছে:", error);
            toast({ title: "ত্রুটি", description: "আপনার ভোট গ্রহণ করা যায়নি।", variant: "destructive" });
        }
    };


  const getToolIcon = (toolName: string) => {
    if (toolName.toLowerCase().includes('summarizer')) return <FileText className="w-4 h-4" />;
    if (toolName.toLowerCase().includes('timeline')) return <Gavel className="w-4 h-4" />;
    if (toolName.toLowerCase().includes('finder')) return <MapPin className="w-4 h-4" />;
    return <Lightbulb className="w-4 h-4" />;
  }
  
  const getTimestamp = (timestamp: any) => {
    if (!timestamp) return 'এইমাত্র';
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString('bn-BD');
    return new Date(timestamp).toLocaleDateString('bn-BD');
  }

  return (
    <div className="w-full">
      <div className="mb-8 rounded-lg border bg-card p-6" id="ask">
        <h3 className="text-xl font-bold">আপনার প্রশ্নটি করুন</h3>
        <p className="text-muted-foreground mb-4">
          কোনো আইনি জিজ্ঞাসা আছে? আমাদের কমিউনিটি এবং AI সহকারীর কাছে জানতে চান।
        </p>
        <Textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="উদাহরণ: একজন ভাড়াটিয়া হিসেবে আমার কী কী অধিকার আছে?"
          disabled={isLoading}
          className="min-h-[100px]"
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAskQuestion} disabled={isLoading || !user || !newQuestion.trim()}>
            {isLoading ? (
              <Sparkles className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            প্রশ্ন পাঠান
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading && <FaqSkeleton />}
        {!loading && (
            <TooltipProvider>
                <Discussion type="multiple" className="w-full" value={defaultOpenValues} onValueChange={setDefaultOpenValues}>
                    {currentFaqs.map((faq) => (
                        <DiscussionItem value={faq.id} key={faq.id}>
                            <DiscussionContent className="gap-2">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={faq.author.avatar} alt={faq.author.name} />
                                    <AvatarFallback>{(faq.author.name || 'A').charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex flex-col gap-1">
                                        <DiscussionTitle className="flex gap-2 items-center">
                                            <Link href={`/faq/${faq.id}`} className="hover:underline">{faq.author.name}</Link>
                                            <span className="text-muted-foreground text-xs">•</span>
                                            <div className="text-muted-foreground text-xs ">{getTimestamp(faq.timestamp)}</div>
                                            {faq.recommendation && (
                                                <>
                                                    <span className="text-muted-foreground text-xs">•</span>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center gap-1.5 cursor-default text-accent">
                                                                {getToolIcon(faq.recommendation.toolRecommendation)}
                                                                <span className="text-xs font-medium">{faq.recommendation.toolRecommendation}</span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-xs">
                                                            <p className="text-sm font-bold mb-1">প্রস্তাবিত টুল</p>
                                                            <p className="text-xs text-muted-foreground">{faq.recommendation.suitabilityReasoning}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </>
                                            )}
                                        </DiscussionTitle>
                                        <DiscussionBody>
                                            <Link href={`/faq/${faq.id}`} className="hover:underline">{faq.question}</Link>
                                        </DiscussionBody>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <DiscussionExpand />
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground h-auto p-1" onClick={() => toggleSaveFaq(faq)} disabled={!user}>
                                                <Bookmark className={`w-4 h-4 ${savedFaqs.some(item => item.originalId === faq.id) ? 'text-accent fill-accent' : ''}`} />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground h-auto p-1">
                                                শেয়ার
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DiscussionContent>
                            <DiscussionReplies>
                            {faq.answers.sort((a,b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).map(answer => {
                                const voteId = `${faq.id}_${answer.id}`;
                                const userVote = userVotes?.[voteId];
                                return(
                                    <DiscussionItem value={`${faq.id}-${answer.id}`} key={answer.id}>
                                        <DiscussionContent className="gap-2">
                                            <div className="flex flex-col items-center gap-1 text-muted-foreground pt-2">
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleVote(faq.id, answer.id, answer.authorUid, 'up')} disabled={!user}>
                                                    <ArrowBigUp className={`w-4 h-4 ${userVote === 'up' ? 'text-primary fill-primary' : ''}`}/>
                                                </Button>
                                                <span className="font-bold text-sm">{answer.upvotes - answer.downvotes}</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleVote(faq.id, answer.id, answer.authorUid, 'down')} disabled={!user}>
                                                    <ArrowBigDown className={`w-4 h-4 ${userVote === 'down' ? 'text-destructive fill-destructive' : ''}`}/>
                                                </Button>
                                            </div>

                                            {answer.authorName === 'AI বট' ? (
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                        <Bot className="w-5 h-5" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={answer.authorAvatar} alt={answer.authorName} />
                                                    <AvatarFallback>{(answer.authorName || 'অ').charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}

                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="flex flex-col gap-1">
                                                    <DiscussionTitle className="flex gap-2 items-center">
                                                        <div>{answer.authorName}</div>
                                                        <span className="text-muted-foreground text-xs">•</span>
                                                        <div className="text-muted-foreground text-xs ">{getTimestamp(answer.timestamp)}</div>
                                                    </DiscussionTitle>
                                                    <DiscussionBody>{answer.content}</DiscussionBody>
                                                </div>
                                            </div>
                                        </DiscussionContent>
                                    </DiscussionItem>
                                )
                            })}
                            </DiscussionReplies>
                        </DiscussionItem>
                    ))}
                </Discussion>
            </TooltipProvider>
        )}
      </div>
      {!loading && totalPages > 1 && (
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
                />
            </PaginationItem>
            <PaginationItem>
                <span className="p-2 text-sm">
                    পৃষ্ঠা {currentPage} / {totalPages}
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
                />
            </PaginationItem>
            </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

    