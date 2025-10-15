
'use client'

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/blocks/Footer';
import { Navbar1Demo } from '@/components/blocks/demo/Navbar1';
import { Chatbot } from '@/components/ui/chatbot';

export default function RootLayoutContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const showLayout = !['/login', '/signup', '/chatbot'].includes(pathname);

    return (
        <>
            {showLayout && <Navbar1Demo />}
            <main className="flex-grow">{children}</main>
            {showLayout && <Footer
                className="mt-20"
                brand={{
                  name: "CaseMap",
                  description: "আপনার AI-চালিত আইনি সঙ্গী, স্বচ্ছতা ও আত্মবিশ্বাসের পথে।",
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
                copyright="CaseMap Inc. © ২০২৪ সর্বসত্ত্ব সংরক্ষিত"
              />}
            {showLayout && <Chatbot />}
        </>
    )
}
