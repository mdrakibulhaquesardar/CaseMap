
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
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
import { PanelLeft, MessageSquare, MessageSquarePlus, Trash2, MoreHorizontal } from 'lucide-react';
import { lawChat } from '@/ai/flows/law-chatbot';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { isToday, isYesterday, isWithinInterval, subDays, formatDistanceToNow, parseISO } from 'date-fns';
import { bn } from 'date-fns/locale';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp?: string;
}

type ChatSession = {
  id: string;
  messages: Message[];
  createdAt: string;
};

const GREETING_MESSAGE: Message = {
    role: 'model',
    content: 'আস-সালামু আলাইকুম! আমি আপনার AI আইনি সহকারী। বাংলাদেশের আইন ও অধিকার সম্পর্কে জানতে প্রশ্ন করুন।',
    timestamp: new Date().toISOString(),
};

export default function ChatbotPage() {
  const [chatHistory, setChatHistory] = useLocalStorage<ChatSession[]>('law-chatHistory', []);
  const [activeChatId, setActiveChatId] = useLocalStorage<string | null>('law-activeChatId', null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatHistory.length === 0) {
      const newChatId = Date.now().toString();
      setActiveChatId(newChatId);
      setChatHistory([{ id: newChatId, messages: [GREETING_MESSAGE], createdAt: new Date().toISOString() }]);
    } else if (!activeChatId || !chatHistory.find(c => c.id === activeChatId)) {
      setActiveChatId(chatHistory[chatHistory.length - 1].id);
    }
  }, []);

  const activeMessages = useMemo(() => {
    const activeChat = chatHistory.find(chat => chat.id === activeChatId);
    return activeChat ? activeChat.messages : [];
  }, [chatHistory, activeChatId]);

  const handleSend = async (messageToSend?: string) => {
    const currentMessage = messageToSend || input;
    if (!currentMessage.trim() || !activeChatId) return;

    const userMessage: Message = { role: 'user', content: currentMessage, timestamp: new Date().toISOString() };
    
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === activeChatId 
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
      )
    );

    setInput('');
    setIsLoading(true);

    try {
      const activeChat = chatHistory.find(chat => chat.id === activeChatId);
      const apiHistory = activeChat ? activeChat.messages.filter(m => m.content !== GREETING_MESSAGE.content).map(({role, content}) => ({role, content})) : [];
      
      const result = await lawChat({
        history: apiHistory,
        message: currentMessage,
      });

      const modelMessage: Message = { role: 'model', content: result.response, timestamp: new Date().toISOString() };
      
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, modelMessage] }
          : chat
        )
      );

    } catch (error) {
      console.error('Law Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, errorMessage] }
          : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
        id: newChatId,
        messages: [GREETING_MESSAGE],
        createdAt: new Date().toISOString(),
    };
    setChatHistory(prev => [newChat, ...prev]);
    setActiveChatId(newChatId);
  }

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setChatHistory(prev => {
        const newHistory = prev.filter(chat => chat.id !== chatId);
        if (newHistory.length === 0) {
            const newChatId = Date.now().toString();
            setActiveChatId(newChatId);
            return [{ id: newChatId, messages: [GREETING_MESSAGE], createdAt: new Date().toISOString() }];
        }
        if (activeChatId === chatId) {
            setActiveChatId(newHistory[0].id);
        }
        return newHistory;
    });
  }

  const getChatTitle = (chat: ChatSession) => {
    const userMessage = chat.messages.find(m => m.role === 'user');
    return userMessage ? userMessage.content : 'নতুন চ্যাট';
  }

  const groupedChats = useMemo(() => {
    const groups: { [key: string]: ChatSession[] } = {
      today: [],
      yesterday: [],
      previous7Days: [],
      older: [],
    };

    const now = new Date();
    
    chatHistory.forEach(chat => {
      const chatDate = parseISO(chat.createdAt);
      if (isToday(chatDate)) {
        groups.today.push(chat);
      } else if (isYesterday(chatDate)) {
        groups.yesterday.push(chat);
      } else if (isWithinInterval(chatDate, { start: subDays(now, 7), end: now })) {
        groups.previous7Days.push(chat);
      } else {
        groups.older.push(chat);
      }
    });
    return groups;
  }, [chatHistory]);

  const groupLabels: { [key: string]: string } = {
    today: 'আজ',
    yesterday: 'গতকাল',
    previous7Days: 'পূর্ববর্তী ৭ দিন',
    older: 'আরও পুরনো'
  };

  const SidebarContentComponent = () => (
    <div className="flex flex-col h-full bg-card text-card-foreground">
        <SidebarHeader className='flex justify-between items-center p-4 border-b'>
          <CardTitle className="text-lg">সাম্প্রতিক কথোপকথন</CardTitle>
        </SidebarHeader>
        <div className="p-2 border-b">
             <Button variant="outline" onClick={handleNewChat} className="w-full h-9 gap-2 justify-start px-3">
                <MessageSquarePlus className="w-4 h-4" />
                নতুন চ্যাট
            </Button>
        </div>
        <SidebarGroup className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
             <Accordion type="multiple" defaultValue={['today', 'yesterday']} className="w-full p-2">
                {Object.entries(groupedChats).map(([groupKey, chats]) => (
                  chats.length > 0 && (
                    <AccordionItem value={groupKey} key={groupKey} className="border-none">
                      <AccordionTrigger className="py-2 px-2 text-xs text-muted-foreground font-semibold uppercase hover:no-underline justify-start gap-2">
                         {groupLabels[groupKey]}
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <div className="space-y-1">
                          {chats.map((chat) => (
                              <Button 
                                  key={chat.id} 
                                  variant="ghost" 
                                  onClick={() => setActiveChatId(chat.id)}
                                  className={cn(
                                      "w-full justify-start h-auto py-2 px-3 text-left group",
                                      activeChatId === chat.id && "bg-primary/10 text-primary font-semibold"
                                  )}
                              >
                                  <MessageSquare className="w-4 h-4 mr-2 shrink-0" />
                                  <span className="truncate flex-1">{getChatTitle(chat)}</span>
                                  <div className="flex items-center ml-2">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={(e) => handleDeleteChat(e, chat.id)}>
                                        <Trash2 className="w-4 h-4 text-muted-foreground"/>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                  </div>
                              </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                ))}
             </Accordion>
          </ScrollArea>
        </SidebarGroup>
    </div>
  );

  return (
    <SidebarProvider>
        <div className="h-screen w-full flex bg-background relative">
             <Sidebar side="left" collapsible="icon" className="hidden md:flex bg-card border-r">
                <SidebarContent>
                  <SidebarContentComponent />
                </SidebarContent>
            </Sidebar>
            <div className="absolute top-4 left-4 z-20 md:hidden">
                <SidebarTrigger className="text-white">
                    <PanelLeft />
                </SidebarTrigger>
            </div>
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <ChatbotClient 
                    messages={activeMessages}
                    isLoading={isLoading}
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                />
            </div>
             <div className="md:hidden">
                 <Sidebar side="left" collapsible="icon">
                    <SidebarContent>
                      <SidebarContentComponent />
                    </SidebarContent>
                </Sidebar>
            </div>
        </div>
    </SidebarProvider>
  );
}
