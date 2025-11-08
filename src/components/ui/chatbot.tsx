
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { chat } from '@/ai/flows/chatbot';
import { useUser } from '@/firebase/auth/use-user';
import { ScrollArea } from './scroll-area';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const GREETING_MESSAGE_CONTENT = 'আস-সালামু আলাইকুম! আমি আপনার আইনি সহকারী। আমি আপনাকে কীভাবে সাহায্য করতে পারি?';
const ERROR_MESSAGE_CONTENT = 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleChatbot = () => {
    setIsOpen(prev => {
        if (!prev) { // If opening
             audioRef.current?.play().catch(error => console.error("Audio play failed:", error));
        }
        return !prev;
    });
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          content: GREETING_MESSAGE_CONTENT,
        },
      ]);
    }
  }, [isOpen, messages.length]);
  
  useEffect(() => {
    const hasOpenedBefore = sessionStorage.getItem('chatbot-auto-opened');
    if (!hasOpenedBefore) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        audioRef.current?.play().catch(error => console.error("Audio autoplay failed and was caught:", error));
        sessionStorage.setItem('chatbot-auto-opened', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
        // Direct scrolling was not working reliably.
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = newMessages.slice(0, -1).filter(m => m.content !== GREETING_MESSAGE_CONTENT && m.content !== ERROR_MESSAGE_CONTENT).map(({role, content}) => ({role, content}));

      const result = await chat({
        history: chatHistory,
        message: currentInput,
      });
      const modelMessage: Message = { role: 'model', content: result.response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: ERROR_MESSAGE_CONTENT,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChatbot}
          size="icon"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-full max-w-sm h-[600px] bg-card border rounded-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b bg-primary/10 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">অধিকারী সহকারী</h3>
                  <p className="text-xs text-muted-foreground">অনলাইন</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'model' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                     {msg.role === 'user' && user && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback>{user.displayName?.charAt(0) || <User />}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="max-w-xs rounded-2xl px-4 py-3 bg-muted text-foreground rounded-bl-none">
                           <Loader className="w-5 h-5 animate-spin" />
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="আপনার প্রশ্ন লিখুন..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={handleSend} size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
