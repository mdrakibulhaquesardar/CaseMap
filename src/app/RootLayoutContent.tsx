
'use client'

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/blocks/Footer';
import { Navbar1Demo } from '@/components/blocks/demo/Navbar1';
import { Chatbot } from '@/components/ui/chatbot';
import LoginPrompt from '@/components/ui/login-prompt';
import { Info } from 'lucide-react';

export default function RootLayoutContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const showLayout = !['/login', '/signup'].includes(pathname);
    const isFullScreenPage = ['/chatbot', '/library/'].some(p => pathname.startsWith(p));


    return (
        <>
            {showLayout && !isFullScreenPage && (
                <div className="bg-yellow-100 dark:bg-yellow-900/50 border-b border-yellow-200 dark:border-yellow-800/50 text-yellow-900 dark:text-yellow-200 p-2 text-center text-sm flex items-center justify-center gap-2">
                    <Info className="w-4 h-4" />
                    <p>
                    <strong>বেটা ভার্সন:</strong> এই সিস্টেমটি পরীক্ষামূলক পর্যায়ে রয়েছে। অনুগ্রহ করে প্রতিটি উত্তর যাচাই করে নিন—আমরা এখানে আছি আপনার সাহায্যের জন্য!
                    </p>
                </div>
            )}
            {showLayout && !isFullScreenPage && <Navbar1Demo />}
            <main className={`flex-grow ${isFullScreenPage ? 'h-screen' : ''}`}>{children}</main>
            {showLayout && !isFullScreenPage && <Footer
                className="mt-20"
                brand={{
                  name: "অধিকারী",
                  description: "আপনার AI-চালিত আইনি সঙ্গী, স্বচ্ছতা ও আত্মবিশ্বাসের পথে—আমরা এখানে আছি আপনার সাহায্যের জন্য!",
                }}
                socialLinks={[
                  {
                    name: "টুইটার",
                    href: "#",
                  },
                  {
                    name: "গিটহাব",
                    href: "#",
                  },
                  {
                    name: "ডিসকর্ড",
                    href: "#",
                  },
                ]}
                columns={[
                  {
                    title: "টুলস",
                    links: [
                      {
                        name: "AI আইনি চ্যাট",
                        iconName: "Bot",
                        href: "/chatbot",
                      },
                      {
                        name: "মামলার টাইমলাইন",
                        iconName: "Blocks",
                        href: "/timeline",
                      },
                      {
                        name: "নথি সারসংক্ষেপ",
                        iconName: "FileText",
                        href: "/summarizer",
                      },
                      {
                        name: "আইনি সহায়তা",
                        iconName: "Users",
                        href: "/legal-aid",
                      },
                      {
                        name: "আইন অনুসন্ধান",
                        iconName: "BookOpen",
                        href: "/law-finder",
                      },
                    ],
                  },
                  {
                    title: "কমিউনিটি",
                    links: [
                      {
                        name: "প্রশ্নোত্তর",
                        iconName: "MessageSquare",
                        href: "/faq",
                      },
                      {
                        name: "নলেজ লাইব্রেরি",
                        iconName: "Library",
                        href: "/library",
                      },
                       {
                        name: "ফোনবুক",
                        iconName: "Phone",
                        href: "/phonebook",
                      },
                      {
                        name: "সেরা অবদানকারী",
                        iconName: "Zap",
                        href: "/faq",
                      },
                    ],
                  },
                  {
                    title: "নীতিমালা",
                    links: [
                      {
                        name: "গোপনীয়তা নীতি",
                        iconName: "Scale",
                        href: "#",
                      },
                      {
                        name: "ব্যবহারের শর্তাবলী",
                        iconName: "Handshake",
                        href: "#",
                      },
                    ],
                  },
                ]}
                copyright="অধিকারী Inc. © ২০২৪ সর্বসত্ত্ব সংরক্ষিত"
              />}
            {showLayout && !isFullScreenPage && <Chatbot />}
            <LoginPrompt />
        </>
    )
}
