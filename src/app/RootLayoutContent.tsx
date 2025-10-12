
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
                  description: "Your AI-powered legal companion for clarity and confidence.",
                }}
                socialLinks={[
                  {
                    name: "Twitter",
                    href: "#",
                  },
                  {
                    name: "Github",
                    href: "#",
                  },
                  {
                    name: "Discord",
                    href: "#",
                  },
                ]}
                columns={[
                  {
                    title: "Tools",
                    links: [
                      {
                        name: "Timeline",
                        iconName: "Blocks",
                        href: "/timeline",
                      },
                      {
                        name: "Summarizer",
                        iconName: "FileText",
                        href: "/summarizer",
                      },
                      {
                        name: "Legal Aid",
                        iconName: "Users",
                        href: "/legal-aid",
                      },
                      {
                        name: "Law Finder",
                        iconName: "BookOpen",
                        href: "/law-finder",
                      },
                    ],
                  },
                  {
                    title: "Community",
                    links: [
                      {
                        name: "Q&A Forum",
                        iconName: "MessageSquare",
                        href: "/faq",
                      },
                      {
                        name: "Top Contributors",
                        iconName: "Zap",
                        href: "/faq",
                      },
                    ],
                  },
                  {
                    title: "Legal",
                    links: [
                      {
                        name: "Privacy Policy",
                        iconName: "Scale",
                        href: "#",
                      },
                      {
                        name: "Terms of Service",
                        iconName: "Handshake",
                        href: "#",
                      },
                    ],
                  },
                ]}
                copyright="CaseMap Inc. © 2024"
              />}
        </>
    )
}
