
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { FaqItem, FaqAnswer } from '@/types';
import { Bot, Sparkles, Send, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { doc, updateDoc, arrayUnion, writeBatch, collection, query, increment } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
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


export default function FaqDetailClient({ faqId }: { faqId: string }) {
  const [newAnswer, setNewAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const faqRef = doc(firestore, 'faqs', faqId);
  const [faqSnapshot, faqLoading] = useDocument(faqRef);
  const faq = faqSnapshot?.exists() ? { id: faqSnapshot.id, ...faqSnapshot.data() } as FaqItem : undefined;

  const userVotesRef = user ? query(collection(firestore, 'users', user.uid, 'userVotes')) : null;
  const [userVotesSnapshot] = useCollection(userVotesRef);
  const userVotes = userVotesSnapshot?.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().vote;
    return acc;
  }, {} as {[key: string]: 'up' | 'down'});


  const handleAddAnswer = async () => {
    if (!newAnswer.trim() || !user || !faq) return;

    setIsLoading(true);
    try {
        const answerToAdd: FaqAnswer = {
            id: Math.random().toString(),
            content: newAnswer,
            authorUid: user.uid,
            authorName: user.displayName || 'নামবিহীন',
            authorAvatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
            upvotes: 0,
            downvotes: 0,
            timestamp: new Date().toISOString(),
        };

        await updateDoc(faqRef, {
            answers: arrayUnion(answerToAdd)
        });

      setNewAnswer('');
    } catch (error) {
      console.error('উত্তর যোগ করতে সমস্যা হয়েছে:', error);
      toast({
        title: 'ত্রুটি',
        description: 'আপনার উত্তর যোগ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVote = async (answerId: string, authorUid: string, voteType: 'up' | 'down') => {
    if (!user || !faq) {
        toast({ title: "ভোট দিতে লগইন করুন।", variant: "destructive" });
        return;
    }

    const voteId = `${faqId}_${answerId}`;
    const userVoteRef = doc(firestore, 'users', user.uid, 'userVotes', voteId);
    const answerAuthorRef = authorUid !== 'ai-bot' ? doc(firestore, 'users', authorUid) : null;
    
    try {
        const batch = writeBatch(firestore);
        const currentVote = userVotes?.[voteId];

        const answerIndex = faq.answers.findIndex(a => a.id === answerId);
        if (answerIndex === -1) return;

        const answer = faq.answers[answerIndex];
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

        const newAnswers = [...faq.answers];
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

  const getTimestamp = (timestamp: any) => {
    if (!timestamp) return 'এইমাত্র';
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString('bn-BD');
    return new Date(timestamp).toLocaleDateString('bn-BD');
  }
  
  if (faqLoading) {
      return <div>লোড হচ্ছে...</div>
  }

  if (!faq) {
      return <div>প্রশ্নটি পাওয়া যায়নি।</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
        <Link href="/faq" className="text-primary hover:underline mb-4 inline-block"> &larr; সকল প্রশ্নে ফিরে যান</Link>
        <Discussion type="single" collapsible className="w-full" defaultValue={faq.id}>
            <DiscussionItem value={faq.id}>
                <DiscussionContent className="gap-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={faq.author.avatar} alt={faq.author.name} />
                        <AvatarFallback>{(faq.author.name || 'A').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-1">
                            <DiscussionTitle className="flex gap-2 items-center">
                                <div>{faq.author.name}</div>
                                <span className="text-muted-foreground text-xs">•</span>
                                <div className="text-muted-foreground text-xs ">{getTimestamp(faq.timestamp)}</div>
                            </DiscussionTitle>
                            <DiscussionBody>{faq.question}</DiscussionBody>
                        </div>
                         {faq.answers.length > 0 && <DiscussionExpand />}
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
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleVote(answer.id, answer.authorUid, 'up')} disabled={!user}>
                                        <ArrowBigUp className={`w-4 h-4 ${userVote === 'up' ? 'text-primary fill-primary' : ''}`}/>
                                    </Button>
                                    <span className="font-bold text-sm">{answer.upvotes - answer.downvotes}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleVote(answer.id, answer.authorUid, 'down')} disabled={!user}>
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
        </Discussion>
      
      <Card className="mt-8">
        <CardHeader>
            <h3 className="font-bold text-xl">আপনার উত্তর দিন</h3>
        </CardHeader>
        <CardContent>
             <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="আপনার জ্ঞান শেয়ার করে কমিউনিটিকে সাহায্য করুন..."
                className="min-h-[150px]"
                disabled={isLoading || !user}
            />
            <div className="mt-4 flex justify-end">
                 <Button onClick={handleAddAnswer} disabled={isLoading || !user}>
                  {isLoading ? (
                    <Sparkles className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  উত্তর পোস্ট করুন
                </Button>
            </div>
             {!user && <p className="text-xs text-destructive mt-2 text-right">উত্তর পোস্ট করতে লগইন করুন।</p>}
        </CardContent>
      </Card>
    </div>
  );
}
