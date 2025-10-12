import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/blocks/Footer';
import { Navbar1Demo } from '@/components/blocks/demo/Navbar1';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'CaseMap Legal Assistant',
  description: 'AI-powered legal awareness and case tracking platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Navbar1Demo />
            <main className="flex-grow">{children}</main>
            <Footer
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
      />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

    