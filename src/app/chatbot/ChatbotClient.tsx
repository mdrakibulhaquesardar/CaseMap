'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { lawChat } from '@/ai/flows/law-chatbot';
import { useUser } from '@/firebase/auth/use-user';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const sampleQuestions = [
    "ভাড়াটিয়া হিসেবে আমার কী কী অধিকার আছে?",
    "ডিজিটাল নিরাপত্তা আইন সম্পর্কে জানতে চাই।",
    "চুরির শাস্তি কী?"
];

export default function ChatbotClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'model',
          content: 'আস-সালামু আলাইকুম! আমি আপনার AI আইনি সহকারী। বাংলাদেশের আইন ও অধিকার সম্পর্কে জানতে প্রশ্ন করুন।',
        },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
             if(scrollAreaRef.current) {
                const viewPort = scrollAreaRef.current.querySelector('div');
                if(viewPort) {
                    viewPort.scroll({ top: viewPort.scrollHeight, behavior: 'smooth' });
                }
            }
        }, 100);
    }
  }, [messages]);

  const handleSend = async (messageToSend?: string) => {
    const currentMessage = messageToSend || input;
    if (!currentMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: currentMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const result = await lawChat({
        history: chatHistory,
        message: currentMessage,
      });
      const modelMessage: Message = { role: 'model', content: result.response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Law Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((msg, index) => (
                <div
                key={index}
                className={`flex items-start gap-4 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
                >
                {msg.role === 'model' && (
                    <Avatar className="h-9 w-9 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={`max-w-xl rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-card text-card-foreground rounded-bl-none'
                    }`}
                >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
                    {msg.role === 'user' && user && (
                    <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback>{user.displayName?.charAt(0) || <User />}</AvatarFallback>
                    </Avatar>
                )}
                </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-4 justify-start">
                    <Avatar className="h-9 w-9 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="max-w-xl rounded-2xl px-4 py-3 bg-card text-card-foreground rounded-bl-none shadow-sm flex items-center">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    </div>
                </div>
            )}
            
            {messages.length <= 1 && (
                 <Card className="bg-background/70">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent"/> উদাহরণের জন্য কিছু প্রশ্ন</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {sampleQuestions.map(q => (
                                <Button key={q} variant="outline" className="text-left h-auto justify-start" onClick={() => handleSend(q)}>
                                    {q}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-background">
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="বাংলাদেশের আইন সম্পর্কে এখানে জিজ্ঞাসা করুন..."
                        className="h-12 pr-14 text-base rounded-full"
                        disabled={isLoading}
                    />
                    <Button onClick={() => handleSend()} size="icon" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-9 h-9">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
