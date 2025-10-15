
'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Triangle } from 'lucide-react';

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
  const router = useRouter();

  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    router.push('/login');
  };

  return (
    <AlertDialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
      <AlertDialogContent className="bg-[#111111] border-[#333333] text-white max-w-sm">
        <AlertDialogHeader className="items-center text-center">
          <div className="w-12 h-12 rounded-full border border-[#333333] flex items-center justify-center mb-4">
             <Triangle className="w-6 h-6 text-white fill-white" />
          </div>
          <AlertDialogTitle className="text-xl">সাইন ইন করুন</AlertDialogTitle>
          <AlertDialogDescription className="text-[#A1A1A1]">
            এই ফিচারটি ব্যবহার করতে এবং আরও উন্নত সুবিধা পেতে, অনুগ্রহ করে সাইন ইন করুন।
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
            <Button
              onClick={handleLoginRedirect}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
             <Triangle className="w-4 h-4 mr-2 fill-black" />
             সাইন ইন করুন
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
