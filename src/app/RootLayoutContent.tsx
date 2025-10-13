
'use client'

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/blocks/Footer';
import { Navbar1Demo } from '@/components/blocks/demo/Navbar1';

export default function RootLayoutContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const showLayout = !['/login', '/signup'].includes(pathname);

    return (
        <>
            {showLayout && <Navbar1Demo />}
            <main className="flex-grow">{children}</main>
            {showLayout && <Footer
                className="mt-20"
                brand={{
                  name: "CaseMap",
                  description: "আপনার এআই-চালিত আইনি সঙ্গী, স্বচ্ছতা এবং আত্মবিশ্বাসের জন্য।",
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
                    title: "সরঞ্জাম",
                    links: [
                      {
                        name: "টাইমলাইন",
                        iconName: "Blocks",
                        href: "/timeline",
                      },
                      {
                        name: "সারাংশকারী",
                        iconName: "FileText",
                        href: "/summarizer",
                      },
                      {
                        name: "আইনি সহায়তা",
                        iconName: "Users",
                        href: "/legal-aid",
                      },
                      {
                        name: "আইন ফাইন্ডার",
                        iconName: "BookOpen",
                        href: "/law-finder",
                      },
                    ],
                  },
                  {
                    title: "কমিউনিটি",
                    links: [
                      {
                        name: "প্রশ্নোত্তর ফোরাম",
                        iconName: "MessageSquare",
                        href: "/faq",
                      },
                      {
                        name: "শীর্ষ অবদানকারী",
                        iconName: "Zap",
                        href: "/faq",
                      },
                    ],
                  },
                  {
                    title: "আইনি",
                    links: [
                      {
                        name: "গোপনীয়তা নীতি",
                        iconName: "Scale",
                        href: "#",
                      },
                      {
                        name: "পরিষেবার শর্তাবলী",
                        iconName: "Handshake",
                        href: "#",
                      },
                    ],
                  },
                ]}
                copyright="CaseMap Inc. © ২০২৪"
              />}
        </>
    )
}
