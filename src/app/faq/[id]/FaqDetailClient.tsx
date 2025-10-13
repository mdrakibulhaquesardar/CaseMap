'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { FaqItem, FaqAnswer } from '@/types';
import { Bot, Sparkles, Send, Bookmark, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { doc, getDoc, updateDoc, arrayUnion, writeBatch, collection, query } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link';

export default function FaqDetailClient({ faqId }: { faqId: string }) {
  const [newAnswer, setNewAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const faqRef = doc(firestore, 'faqs', faqId);
  const [faqSnapshot, faqLoading] = useDocument(faqRef);
  const faq = faqSnapshot?.data() as FaqItem | undefined;

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
            authorName: user.displayName || 'Anonymous',
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
      console.error('Error adding answer:', error);
      toast({
        title: 'Error',
        description: 'Failed to add your answer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVote = async (answerId: string, voteType: 'up' | 'down') => {
    if (!user || !faq) {
        toast({ title: "Please log in to vote.", variant: "destructive" });
        return;
    }

    const voteId = `${faqId}_${answerId}`;
    const userVoteRef = doc(firestore, 'users', user.uid, 'userVotes', voteId);
    
    try {
        const batch = writeBatch(firestore);
        const currentVote = userVotes?.[voteId];

        const answerIndex = faq.answers.findIndex(a => a.id === answerId);
        if (answerIndex === -1) return;

        const answer = faq.answers[answerIndex];
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

        const newAnswers = [...faq.answers];
        newAnswers[answerIndex] = { ...answer, upvotes, downvotes };
        batch.update(faqRef, { answers: newAnswers });

        await batch.commit();

    } catch (error) {
        console.error("Error voting:", error);
        toast({ title: "Error", description: "Could not register your vote.", variant: "destructive" });
    }
  };

  const getTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString();
    return new Date(timestamp).toLocaleDateString();
  }
  
  if (faqLoading) {
      return <div>Loading...</div>
  }

  if (!faq) {
      return <div>Question not found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
        <Link href="/faq" className="text-primary hover:underline mb-4 inline-block"> &larr; Back to all questions</Link>
      <Card className="shadow-sm overflow-hidden">
         <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-foreground mb-3">{faq.question}</h1>
            <div className="flex gap-2 mb-4 flex-wrap">
                {faq.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                    {tag}
                    </Badge>
                ))}
            </div>

            <div className="flex justify-end items-end">
                <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={faq.author.avatar} alt={faq.author.name} />
                        <AvatarFallback>{faq.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{faq.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                            asked on {getTimestamp(faq.timestamp)}
                        </p>
                    </div>
                </div>
            </div>
         </div>

          <Separator />

          <div className="bg-muted/30 p-4 sm:p-6 space-y-6">
            <h3 className="font-bold text-xl">{faq.answers.length} Answer{faq.answers.length !== 1 && 's'}</h3>
            {faq.answers.sort((a,b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).map((answer) => {
                const voteId = `${faqId}_${answer.id}`;
                const userVote = userVotes?.[voteId];
                return (
                  <div key={answer.id} className="flex items-start gap-3 sm:gap-4">
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <Button variant="ghost" size="icon" onClick={() => handleVote(answer.id, 'up')} disabled={!user}>
                            <ArrowBigUp className={`w-5 h-5 ${userVote === 'up' ? 'text-primary fill-primary' : ''}`}/>
                        </Button>
                        <span className="font-bold text-lg">{answer.upvotes - answer.downvotes}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleVote(answer.id, 'down')} disabled={!user}>
                            <ArrowBigDown className={`w-5 h-5 ${userVote === 'down' ? 'text-destructive fill-destructive' : ''}`}/>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <p className="text-foreground whitespace-pre-wrap">{answer.content}</p>
                        <div className="flex justify-end mt-4">
                            <div className="flex items-center gap-3 bg-background p-2 rounded-lg border">
                                <div className="bg-muted p-2 rounded-full">
                                {answer.authorName === 'AI Bot' ? (
                                    <Bot className="w-5 h-5 text-primary" />
                                ) : (
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={answer.authorAvatar} alt={answer.authorName} />
                                        <AvatarFallback>{answer.authorName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{answer.authorName}</p>
                                    <p className="text-xs text-muted-foreground">
                                    answered on {getTimestamp(answer.timestamp)}
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
      
      <Card className="mt-8">
        <CardHeader>
            <h3 className="font-bold text-xl">Your Answer</h3>
        </CardHeader>
        <CardContent>
             <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Share your knowledge and help the community..."
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
                  Post Your Answer
                </Button>
            </div>
             {!user && <p className="text-xs text-destructive mt-2 text-right">Please log in to post an answer.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
