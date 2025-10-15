
'use client';

import { useState, useEffect, useMemo } from 'react';
import ChatbotClient from './ChatbotClient';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarTrigger, 
  SidebarContent, 
  SidebarHeader,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { CardTitle } from '@/components/ui/card';
import { PanelLeft, MessageSquare, MessageSquarePlus, Trash2 } from 'lucide-react';
import { lawChat } from '@/ai/flows/law-chatbot';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

type ChatSession = Message[];

const GREETING_MESSAGE: Message = {
    role: 'model',
    content: 'আস-সালামু আলাইকুম! আমি আপনার AI আইনি সহকারী। বাংলাদেশের আইন ও অধিকার সম্পর্কে জানতে প্রশ্ন করুন।',
};

export default function ChatbotPage() {
  const [chatHistory, setChatHistory] = useLocalStorage<ChatSession[]>('chatHistory', []);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatHistory.length === 0) {
      setActiveChatId(0);
      setChatHistory([[GREETING_MESSAGE]]);
    } else if (activeChatId === null) {
      setActiveChatId(chatHistory.length - 1);
    }
  }, []);

  const activeMessages = useMemo(() => {
    if (activeChatId !== null && chatHistory[activeChatId]) {
      return chatHistory[activeChatId];
    }
    return [GREETING_MESSAGE];
  }, [chatHistory, activeChatId]);

  const handleSend = async (messageToSend?: string) => {
    const currentMessage = messageToSend || input;
    if (!currentMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: currentMessage };
    
    let currentChatId = activeChatId;

    // If the current chat is just the greeting, start a new one
    if (activeChatId === null || activeMessages.length === 1 && activeMessages[0].content === GREETING_MESSAGE.content) {
        currentChatId = chatHistory.length;
        setChatHistory(prev => [...prev, [userMessage]]);
        setActiveChatId(currentChatId);
    } else {
        setChatHistory(prev => {
            const newHistory = [...prev];
            if(currentChatId !== null) {
                newHistory[currentChatId] = [...newHistory[currentChatId], userMessage];
            }
            return newHistory;
        });
    }

    setInput('');
    setIsLoading(true);

    try {
      const apiHistory = (currentChatId !== null ? chatHistory[currentChatId] : []).filter(m => m.content !== GREETING_MESSAGE.content);
      
      const result = await lawChat({
        history: apiHistory,
        message: currentMessage,
      });
      const modelMessage: Message = { role: 'model', content: result.response };
      
      setChatHistory(prev => {
        const newHistory = [...prev];
        if(currentChatId !== null) {
            newHistory[currentChatId] = [...newHistory[currentChatId], modelMessage];
        }
        return newHistory;
      });

    } catch (error) {
      console.error('Law Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      };
      setChatHistory(prev => {
        const newHistory = [...prev];
        if(currentChatId !== null) {
            newHistory[currentChatId] = [...newHistory[currentChatId], errorMessage];
        }
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewChat = () => {
    const newChatId = chatHistory.length;
    setChatHistory(prev => [...prev, [GREETING_MESSAGE]]);
    setActiveChatId(newChatId);
  }

  const handleDeleteChat = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setChatHistory(prev => {
        const newHistory = prev.filter((_, i) => i !== index);
        if (newHistory.length === 0) {
            setActiveChatId(0);
            return [[GREETING_MESSAGE]];
        }
        if (activeChatId === index) {
            setActiveChatId(newHistory.length - 1);
        } else if (activeChatId !== null && activeChatId > index) {
            setActiveChatId(activeChatId - 1);
        }
        return newHistory;
    });
  }

  const getChatTitle = (chat: ChatSession) => {
    const userMessage = chat.find(m => m.role === 'user');
    return userMessage ? userMessage.content : 'নতুন চ্যাট';
  }

  const SidebarContentComponent = () => (
    <div className="flex flex-col h-full">
        <SidebarHeader className='flex justify-between items-center'>
          <CardTitle>চ্যাট হিস্ট্রি</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleNewChat} className="text-foreground">
            <MessageSquarePlus className="w-5 h-5" />
          </Button>
        </SidebarHeader>
        <SidebarGroup className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
             <div className="p-2 space-y-1">
                {chatHistory.map((chat, index) => (
                    <Button 
                        key={index} 
                        variant="ghost" 
                        onClick={() => setActiveChatId(index)}
                        className={cn(
                            "w-full justify-start h-auto py-2 px-3 text-left group",
                            activeChatId === index && "bg-accent text-accent-foreground"
                        )}
                    >
                        <MessageSquare className="w-4 h-4 mr-2 shrink-0" />
                        <span className="truncate flex-1">{getChatTitle(chat)}</span>
                        <Trash2 
                            className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleDeleteChat(e, index)}
                        />
                    </Button>
                ))}
             </div>
          </ScrollArea>
        </SidebarGroup>
    </div>
  );

  return (
    <SidebarProvider>
        <div className="h-screen w-full flex bg-background relative">
             <Sidebar side="left" className="hidden lg:flex">
                <SidebarContent className='bg-card'>
                  <SidebarContentComponent />
                </SidebarContent>
            </Sidebar>

            <div className="flex-1 flex flex-col h-screen">
                 <div className="absolute top-4 left-4 z-20">
                    <SidebarTrigger className="lg:hidden text-white">
                        <PanelLeft />
                    </SidebarTrigger>
                    <Sidebar side="left" className="lg:hidden">
                       <SidebarContent className='bg-card'>
                         <SidebarContentComponent />
                       </SidebarContent>
                    </Sidebar>
                </div>
                <ChatbotClient 
                    messages={activeMessages}
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
