'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FaqItem, FaqAnswer } from '@/types';
import { ThumbsUp, ThumbsDown, User, Bot, Sparkles, Send, Bookmark, Lightbulb, FileText, Gavel, MapPin, MessageSquare, MoreHorizontal, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { askLegalQuestion } from '@/ai/flows/community-legal-q-and-a';
import { legalToolRecommendation } from '@/ai/flows/legal-tool-recommendation';
import { useToast } from '@/hooks/use-toast';
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
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp, query, orderBy, doc, setDoc, deleteDoc, getDocs, where, writeBatch, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link';

const ITEMS_PER_PAGE = 5;

export default function FaqClient() {
  const [newQuestion, setNewQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();
  const firestore = useFirestore();

  const faqsRef = query(collection(firestore, 'faqs'), orderBy('timestamp', 'desc'));
  const [faqsSnapshot] = useCollection(faqsRef);
  
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    if (faqsSnapshot) {
      const faqsData = faqsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as FaqItem));
      setFaqs(faqsData);
    }
  }, [faqsSnapshot]);


  const savedFaqsRef = user ? query(collection(firestore, 'users', user.uid, 'savedFaqs')) : null;
  const [savedFaqsSnapshot] = useCollection(savedFaqsRef);
  const savedFaqs = savedFaqsSnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id, faqId: doc.data().id } as FaqItem & {faqId: string})) || [];

  const userVotesRef = user ? query(collection(firestore, 'users', user.uid, 'userVotes')) : null;
  const [userVotesSnapshot] = useCollection(userVotesRef);
  const userVotes = userVotesSnapshot?.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().vote;
    return acc;
  }, {} as {[key: string]: 'up' | 'down'});


  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
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
        tags: ['নতুন', 'এআই উত্তর'],
        timestamp: serverTimestamp(),
        author: { name: user.displayName || "বর্তমান ব্যবহারকারী", avatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}` },
        answers: [
          {
            id: Math.random().toString(),
            content: answerResponse.answer,
            authorName: 'এআই বট',
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
      console.error('Error fetching AI answers:', error);
      toast({
        title: 'ত্রুটি',
        description: 'একটি উত্তর পেতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।',
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
        toast({ title: "প্রোফাইল থেকে সরানো হয়েছে", description: "এই প্রশ্নোত্তরটি আপনার সংরক্ষিত তালিকা থেকে সরানো হয়েছে।" });
    } else {
        const faqToSave = { ...faq };
        // Firestore doesn't like `undefined` values.
        if (faqToSave.id) {
          await addDoc(collection(firestore, 'users', user.uid, 'savedFaqs'), {
            ...faqToSave,
            originalId: faq.id
          });
        }
        
        toast({ title: "প্রোফাইলে সংরক্ষিত হয়েছে", description: "আপনি আপনার প্রোফাইলে এই প্রশ্নোত্তর দেখতে পারেন।" });
    }
  };

    const handleVote = async (faqId: string, answerId: string, voteType: 'up' | 'down') => {
        if (!user) {
            toast({ title: "ভোট দিতে লগইন করুন।", variant: "destructive" });
            return;
        }

        const voteId = `${faqId}_${answerId}`;
        const userVoteRef = doc(firestore, 'users', user.uid, 'userVotes', voteId);
        const faqRef = doc(firestore, 'faqs', faqId);

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

            if (currentVote === voteType) { // Undoing vote
                if (voteType === 'up') upvotes--;
                else downvotes--;
                batch.delete(userVoteRef);
            } else { // New vote or changing vote
                if (currentVote === 'up') upvotes--;
                if (currentVote === 'down') downvotes--;
                
                if (voteType === 'up') upvotes++;
                else downvotes++;
                
                batch.set(userVoteRef, { vote: voteType });
            }

            const newAnswers = [...faqData.answers];
            newAnswers[answerIndex] = { ...answer, upvotes, downvotes };
            batch.update(faqRef, { answers: newAnswers });

            await batch.commit();

        } catch (error) {
            console.error("Error voting:", error);
            toast({ title: "ত্রুটি", description: "আপনার ভোট নিবন্ধন করা যায়নি।", variant: "destructive" });
        }
    };


  const getToolIcon = (toolName: string) => {
    if (toolName.toLowerCase().includes('summarizer')) return <FileText className="w-5 h-5 text-accent" />;
    if (toolName.toLowerCase().includes('timeline')) return <Gavel className="w-5 h-5 text-accent" />;
    if (toolName.toLowerCase().includes('finder')) return <MapPin className="w-5 h-5 text-accent" />;
    return <Lightbulb className="w-5 h-5 text-accent" />;
  }
  
  const getTimestamp = (timestamp: any) => {
    if (!timestamp) return 'এইমাত্র';
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString('bn-BD');
    return new Date(timestamp).toLocaleDateString('bn-BD');
  }

  return (
    <div className="w-full">
      <Card className="mb-8 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-lg mb-2">একটি নতুন প্রশ্ন করুন</h3>
          <p className="text-muted-foreground text-sm mb-4">
            আপনার কি কোন আইনি সন্দেহ আছে? আমাদের কমিউনিটি এবং এআই সহকারীকে জিজ্ঞাসা করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="যেমন, আমি কীভাবে একটি ভোক্তা অভিযোগ দায়ের করব?"
              disabled={isLoading || !user}
            />
            <Button onClick={handleAskQuestion} disabled={isLoading || !user} className="w-full sm:w-auto">
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              জিজ্ঞাসা করুন
            </Button>
          </div>
           {!user && <p className="text-xs text-destructive mt-2">প্রশ্ন জিজ্ঞাসা করতে লগইন করুন।</p>}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {currentFaqs.map((faq) => (
          <Card key={faq.id} id={faq.id} className="shadow-sm overflow-hidden">
             <div className="p-4 sm:p-6">
                <Link href={`/faq/${faq.id}`} className="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">{faq.question}</Link>
                <div className="flex gap-2 mb-4 flex-wrap">
                    {faq.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                        {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground" onClick={() => toggleSaveFaq(faq)} disabled={!user}>
                            <Bookmark className={`w-4 h-4 ${savedFaqs.some(item => item.originalId === faq.id) ? 'text-accent fill-accent' : ''}`} />
                            {savedFaqs.some(item => item.originalId === faq.id) ? 'সংরক্ষিত' : 'সংরক্ষণ'}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            শেয়ার করুন
                        </Button>
                    </div>

                    <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={faq.author.avatar} alt={faq.author.name} />
                            <AvatarFallback>{faq.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">{faq.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                                জিজ্ঞাসা করেছেন {getTimestamp(faq.timestamp)}
                            </p>
                        </div>
                    </div>
                </div>

                 {faq.recommendation && (
                    <Card className="mt-4 border-accent bg-accent/10">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            {getToolIcon(faq.recommendation.toolRecommendation)}
                        <div>
                            <h4 className="font-bold text-sm">টুল সুপারিশ: {faq.recommendation.toolRecommendation}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{faq.recommendation.suitabilityReasoning}</p>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                )}

             </div>

              <Separator />

              <div className="bg-muted/30 p-4 sm:p-6 space-y-6">
                <h3 className="font-bold text-lg">{faq.answers.length} উত্তর</h3>
                {faq.answers.map((answer) => {
                   const voteId = `${faq.id}_${answer.id}`;
                   const userVote = userVotes?.[voteId];
                   return(
                      <div key={answer.id} className="flex items-start gap-3 sm:gap-4">
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <Button variant="ghost" size="icon" onClick={() => handleVote(faq.id, answer.id, 'up')} disabled={!user}>
                                <ArrowBigUp className={`w-5 h-5 ${userVote === 'up' ? 'text-primary fill-primary' : ''}`}/>
                            </Button>
                            <span className="font-bold text-lg">{answer.upvotes - answer.downvotes}</span>
                            <Button variant="ghost" size="icon" onClick={() => handleVote(faq.id, answer.id, 'down')} disabled={!user}>
                                <ArrowBigDown className={`w-5 h-5 ${userVote === 'down' ? 'text-destructive fill-destructive' : ''}`}/>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <p className="text-foreground">{answer.content}</p>
                            <div className="flex justify-end mt-4">
                                <div className="flex items-center gap-3 bg-background p-2 rounded-lg border">
                                    <div className="bg-muted p-2 rounded-full">
                                    {answer.authorName === 'এআই বট' ? (
                                        <Bot className="w-5 h-5 text-primary" />
                                    ) : (
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={answer.authorAvatar} alt={answer.authorName} />
                                            <AvatarFallback>{(answer.authorName || "A").charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">{answer.authorName || 'নামবিহীন'}</p>
                                        <p className="text-xs text-muted-foreground">
                                        উত্তর দিয়েছেন {getTimestamp(answer.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    )
                })}
              </div>

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
            />
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
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
