
'use client';

import { useState, useEffect } from 'react';
import ChatbotClient from './ChatbotClient';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarTrigger, 
  SidebarContent, 
  SidebarHeader,
  SidebarGroup,
  SidebarInset
} from '@/components/ui/sidebar';
import { CardTitle } from '@/components/ui/card';
import { PanelLeft } from 'lucide-react';
import { lawChat } from '@/ai/flows/law-chatbot';


interface Message {
  role: 'user' | 'model';
  content: string;
}

const commonQuestions = [
    {
        q: "ভোক্তা হিসেবে আমার কী কী অধিকার আছে?",
        a: "ভোক্তা হিসেবে আপনার মানসম্মত পণ্য ও সেবা পাওয়ার, সঠিক ওজন ও পরিমাপে পণ্য পাওয়ার, এবং প্রতারণামূলক বিজ্ঞাপন থেকে সুরক্ষিত থাকার অধিকার আছে। কোনো অভিযোগ থাকলে আপনি ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে অভিযোগ করতে পারেন।"
    },
    {
        q: "জমির দলিল হারিয়ে গেলে কী করতে হবে?",
        a: "জমির দলিল হারিয়ে গেলে প্রথমে নিকটস্থ থানায় একটি সাধারণ ডায়েরি (জিডি) করতে হবে। এরপর, জিডির কপি সহ স্থানীয় সাব-রেজিস্ট্রি অফিসে দলিলের नकल তোলার জন্য আবেদন করতে হবে।"
    },
    {
        q: "ডিজিটাল নিরাপত্তা আইন অনুযায়ী কোন কাজগুলো অপরাধ?",
        a: "ডিজিটাল নিরাপত্তা আইন অনুযায়ী, অনুমতি ছাড়া কারো ব্যক্তিগত তথ্য প্রকাশ, ডিজিটাল মাধ্যমে হয়রানি, ভুয়া পরিচয় ব্যবহার, ধর্মীয় অনুভূতিতে আঘাত হানা, এবং দেশের ভাবমূর্তি ক্ষুণ্ণকারী কোনো তথ্য ছড়ানো অপরাধ হিসেবে গণ্য হয়।"
    }
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSend = async (messageToSend?: string) => {
    const currentMessage = messageToSend || input;
    if (!currentMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: currentMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages.filter(m => m.content !== 'আস-সালামু আলাইকুম! আমি আপনার AI আইনি সহকারী। বাংলাদেশের আইন ও অধিকার সম্পর্কে জানতে প্রশ্ন করুন।');
      
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
    <SidebarProvider>
        <div className="h-full w-full flex bg-background relative">
             <Sidebar side="left" className="hidden lg:flex">
              <SidebarContent className='bg-card'>
                <SidebarHeader>
                  <CardTitle>সাধারণ জিজ্ঞাসা</CardTitle>
                </SidebarHeader>
                <SidebarGroup>
                   <Accordion type="single" collapsible className="w-full">
                      {commonQuestions.map((item, index) => (
                         <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger onClick={() => handleSend(item.q)}>{item.q}</AccordionTrigger>
                            <AccordionContent>
                            {item.a}
                            </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <div className="flex-1 flex flex-col">
                 <div className="absolute top-4 left-4 z-20">
                    <SidebarTrigger className="lg:hidden text-white">
                        <PanelLeft />
                    </SidebarTrigger>
                </div>
                <ChatbotClient 
                    messages={messages}
                    isLoading={isLoading}
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                />
            </div>
        </div>
    </SidebarProvider>
  );
}

    