
'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Scale, MailCheck, Loader2 } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

interface LoginPromptContextType {
  showLoginPrompt: boolean;
  setShowLoginPrompt: (show: boolean) => void;
}

const LoginPromptContext = createContext<LoginPromptContextType | undefined>(undefined);

export const useLoginPrompt = () => {
  const context = useContext(LoginPromptContext);
  if (!context) {
    throw new Error('useLoginPrompt must be used within a LoginPromptProvider');
  }
  return context;
};

export function LoginPromptProvider({ children }: { children: ReactNode }) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  return (
    <LoginPromptContext.Provider value={{ showLoginPrompt, setShowLoginPrompt }}>
      {children}
      <LoginPrompt />
    </LoginPromptContext.Provider>
  );
}

export default function LoginPrompt() {
  const { showLoginPrompt, setShowLoginPrompt } = useLoginPrompt();
  const { user, isVerified } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);

  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    router.push('/login');
  };
  
  const handleResendVerification = async () => {
    if (!user) return;
    setIsResending(true);
    try {
        await sendEmailVerification(user);
        toast({
            title: "ইমেল পাঠানো হয়েছে",
            description: "একটি নতুন ভেরিফিকেশন ইমেল আপনার ঠিকানায় পাঠানো হয়েছে।",
        });
    } catch (error) {
        toast({
            title: "ত্রুটি",
            description: "ইমেল পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
            variant: "destructive",
        });
    } finally {
        setIsResending(false);
    }
  };

  const isLoggedInButNotVerified = user && !isVerified;

  return (
    <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
      <DialogContent className="bg-[#111111] border-[#333333] text-white max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="w-16 h-16 rounded-full border border-[#333333] flex items-center justify-center mb-4">
             {isLoggedInButNotVerified ? <MailCheck className="w-8 h-8 text-white" /> : <Scale className="w-8 h-8 text-white" />}
          </div>
          <DialogTitle className="text-xl">
            {isLoggedInButNotVerified ? 'আপনার ইমেল ভেরিফাই করুন' : 'সাইন ইন করুন'}
          </DialogTitle>
          <DialogDescription className="text-[#A1A1A1]">
            {isLoggedInButNotVerified 
              ? 'এই ফিচারটি ব্যবহার করতে আপনার ইমেল ঠিকানা ভেরিফাই করতে হবে। আপনার ইনবক্স চেক করুন।' 
              : 'এই ফিচারটি ব্যবহার করতে এবং আরও উন্নত সুবিধা পেতে, অনুগ্রহ করে সাইন ইন করুন।'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex-col gap-2">
            {isLoggedInButNotVerified ? (
                <Button
                  onClick={handleResendVerification}
                  className="w-full bg-white text-black hover:bg-gray-200"
                  disabled={isResending}
                >
                 {isResending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <MailCheck className="w-4 h-4 mr-2" />}
                 পুনরায় ভেরিফিকেশন ইমেল পাঠান
                </Button>
            ) : (
                <Button
                  onClick={handleLoginRedirect}
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                 <Scale className="w-4 h-4 mr-2" />
                 সাইন ইন করুন
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
