
'use client';

import { useState, useRef, useEffect, useCallback, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, XIcon, LoaderIcon } from 'lucide-react';
import { lawChat } from '@/ai/flows/law-chatbot';
import { useUser } from '@/firebase/auth/use-user';
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'model';
  content: string;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: { minHeight: number; maxHeight?: number; }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}


const sampleQuestions = [
    "ভাড়াটিয়া হিসেবে আমার কী কী অধিকার আছে?",
    "ডিজিটাল নিরাপত্তা আইন সম্পর্কে জানতে চাই।",
    "চুরির শাস্তি কী?"
];

function TypingDots() {
    return (
        <div className="flex items-center ml-1">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-white/90 rounded-full mx-0.5"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.85, 1.1, 0.85]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)"
                    }}
                />
            ))}
        </div>
    );
}

interface ChatbotClientProps {
    messages: Message[];
    isLoading: boolean;
    input: string;
    setInput: (value: string) => void;
    handleSend: (messageToSend?: string) => void;
}

export default function ChatbotClient({
    messages,
    isLoading,
    input,
    setInput,
    handleSend
}: ChatbotClientProps) {
  const { user } = useUser();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
   const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
             if(scrollAreaRef.current) {
                scrollAreaRef.current.scroll({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
            }
        }, 100);
    }
  }, [messages]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (input.trim()) {
            handleSend(input);
        }
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center bg-transparent text-white w-full relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
            <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
        </div>

        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-end">
            <div ref={scrollAreaRef} className="overflow-y-auto p-4 space-y-6 no-scrollbar">
                {messages.map((msg, index) => (
                    <motion.div
                    key={index}
                    className={`flex items-start gap-4 ${ msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    >
                    {msg.role === 'model' && (
                        <div className="w-9 h-9 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                        </div>
                    )}
                    <div className={`max-w-xl rounded-2xl px-4 py-3 text-sm shadow-sm ${ msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'}`}>
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && user && (
                        <div className="w-9 h-9 flex-shrink-0 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                    )}
                    </motion.div>
                ))}
                 {isLoading && (
                    <motion.div 
                        className="flex items-start gap-4 justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-9 h-9 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div className="max-w-xl rounded-2xl px-4 py-3 bg-card text-card-foreground rounded-bl-none shadow-sm flex items-center">
                            <TypingDots />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>

        <motion.div 
            className="w-full max-w-4xl mx-auto p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
             {messages.length <= 1 && (
                 <div className="flex justify-center gap-2 mb-3 flex-wrap">
                    {sampleQuestions.map(q => (
                        <motion.button 
                            key={q} 
                            onClick={() => handleSend(q)}
                            className="px-3 py-1.5 bg-card/80 backdrop-blur-sm text-card-foreground text-xs rounded-full border border-border hover:bg-muted transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            {q}
                        </motion.button>
                    ))}
                </div>
            )}
            <motion.div 
                className="relative backdrop-blur-2xl bg-card/80 rounded-2xl border border-border shadow-2xl"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="p-2 sm:p-4">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            adjustHeight();
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        placeholder="বাংলাদেশের আইন সম্পর্কে এখানে জিজ্ঞাসা করুন..."
                        className={cn(
                            "w-full px-2 py-3",
                            "resize-none",
                            "bg-transparent",
                            "border-none",
                            "text-card-foreground text-sm",
                            "focus:outline-none",
                            "placeholder:text-muted-foreground",
                            "min-h-[60px]"
                        )}
                        style={{
                            overflow: "hidden",
                        }}
                    />
                </div>
                <div className="p-2 sm:p-4 border-t border-border/50 flex items-center justify-end gap-4">
                    <motion.button
                        type="button"
                        onClick={() => handleSend(input)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading || !input.trim()}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            "flex items-center gap-2",
                            input.trim()
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                        <span>পাঠান</span>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
         {inputFocused && (
                <motion.div 
                    className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.05] bg-gradient-to-r from-primary via-accent to-primary/50 blur-[96px]"
                    animate={{
                        x: mousePosition.x - 400,
                        y: mousePosition.y - 400,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 150,
                        mass: 0.5,
                    }}
                />
            )}
    </div>
  );
}

    