
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
import { Scale } from 'lucide-react';

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
    <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
      <DialogContent className="bg-[#111111] border-[#333333] text-white max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="w-12 h-12 rounded-full border border-[#333333] flex items-center justify-center mb-4">
             <Scale className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl">সাইন ইন করুন</DialogTitle>
          <DialogDescription className="text-[#A1A1A1]">
            এই ফিচারটি ব্যবহার করতে এবং আরও উন্নত সুবিধা পেতে, অনুগ্রহ করে সাইন ইন করুন।
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
            <Button
              onClick={handleLoginRedirect}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
             <Scale className="w-4 h-4 mr-2" />
             সাইন ইন করুন
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
