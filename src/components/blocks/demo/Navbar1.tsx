

"use client";

import { Navbar1 } from "@/components/blocks/Navbar1";
import { useUser } from "@/firebase/auth/use-user";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  Gavel,
  MessageSquare,
  Users,
  Info,
  Bot,
  Library,
  Phone,
  Scale,
  BrainCircuit,
  Heart,
} from "lucide-react";
import { useLoginPrompt } from "@/components/ui/login-prompt";

const menuItems = [
    {
      title: "হোম",
      url: "/",
    },
    {
      title: "টুলস",
      url: "#",
      items: [
        {
          title: "AI আইনি চ্যাট",
          description: "AI এর সাথে কথা বলে আইনি তথ্য জানুন—খুবই সহজ!",
          icon: <Bot className="size-5 shrink-0" />,
          url: "/chatbot",
          isProtected: true,
        },
        {
          title: "মামলার টাইমলাইন",
          description: "আপনার মামলার অগ্রগতি ট্র্যাক করুন—সবকিছু এক নজরে!",
          icon: <Gavel className="size-5 shrink-0" />,
          url: "/timeline",
          isProtected: true,
        },
        {
          title: "নথি সারসংক্ষেপ",
          description: "জটিল আইনি নথি সহজে বুঝুন—এখন আর বুঝতে হবে না কঠিন ভাষা!",
          icon: <FileText className="size-5 shrink-0" />,
          url: "/summarizer",
          isProtected: true,
        },
        {
          title: "আইনি সহায়তা",
          description: "কাছাকাছি আইনি সহায়তা কেন্দ্র খুঁজুন—আপনার জন্য সঠিক কেন্দ্র!",
          icon: <Users className="size-5 shrink-0" />,
          url: "/legal-aid",
        },
        {
          title: "আইন অনুসন্ধান",
          description: "বাংলাদেশের আইন ও ধারা সম্পর্কে জানুন—সবকিছু সহজ ভাষায়!",
          icon: <BookOpen className="size-5 shrink-0" />,
          url: "/law-finder",
        },
      ],
    },
     {
      title: "কমিউনিটি",
      url: "#",
      items: [
        {
          title: "প্রশ্নোত্তর",
          description: "আপনার আইনি প্রশ্ন জিজ্ঞাসা করুন—AI এবং কমিউনিটি থেকে উত্তর পান!",
          icon: <MessageSquare className="size-5 shrink-0" />,
          url: "/faq",
          isProtected: true,
        },
        {
          title: "নলেজ লাইব্রেরি",
          description: "আইনি নথি, বই ও রিসোর্স ব্রাউজ করুন—সবকিছু আপনার হাতের মুঠোয়!",
          icon: <Library className="size-5 shrink-0" />,
          url: "/library",
        },
        {
            title: "ফোনবুক",
            description: "জরুরি ও সরকারি পরিষেবার নম্বর খুঁজুন—খুবই সহজ!",
            icon: <Phone className="size-5 shrink-0" />,
            url: "/phonebook",
        },
      ],
    },
     {
      title: "অনুদান",
      url: "/donation",
    },
    {
      title: "আমাদের সম্পর্কে",
      url: "#",
       items: [
        {
          title: "আমাদের লক্ষ্য",
          description: "অধিকারী প্ল্যাটফর্মের উদ্দেশ্য সম্পর্কে জানুন—আমরা এখানে আছি আপনার সাহায্যের জন্য!",
          icon: <Info className="size-5 shrink-0" />,
          url: "/about",
        },
        {
          title: "গোপনীয়তা নীতি",
          description: "আমাদের ডেটা ব্যবহারের নীতি সম্পর্কে জানুন—আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ!",
          icon: <Scale className="size-5 shrink-0" />,
          url: "/privacy",
        },
        {
          title: "AI যেভাবে কাজ করে",
          description: "আমাদের AI মডেল কীভাবে উত্তর দেয় তা বুঝুন—খুবই মজার!",
          icon: <BrainCircuit className="size-5 shrink-0" />,
          url: "/how-it-works",
        },
      ],
    },
];

const demoData = {
  logo: {
    url: "/",
    src: "/logo.png",
    alt: "অধিকারী Legal Companion",
    title: "অধিকারী",
  },
  mobileExtraLinks: [
    { name: "প্রোফাইল", url: "/profile" },
    { name: "সেটিংস", url: "/profile/settings" },
    { name: "গোপনীয়তা", url: "/privacy" },
    { name: "শর্তাবলী", url: "#" },
  ],
};

function Navbar1Demo() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { setShowLoginPrompt } = useLoginPrompt();

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/");
  };
  
  const authLinks = user
    ? {
        login: { text: "প্রোফাইল", url: "/profile" },
        signup: { text: "সাইন আউট", url: "#", onClick: handleSignOut },
      }
    : {
        login: { text: "লগ ইন", url: "/login" },
        signup: { text: "সাইন আপ", url: "/signup" },
      };

  const processedMenu = useMemo(() => {
    const processItems = (items: any[]): any[] => {
      return items.map(item => {
        const newItem = { ...item };
        
        const originalOnClick = newItem.onClick;

        if (newItem.isProtected && !user) {
          newItem.onClick = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setShowLoginPrompt(true);
            if (originalOnClick) {
              originalOnClick(e);
            }
          };
          newItem.url = '#'; 
        } else if (newItem.url !=='#' && newItem.isProtected && !user) {
           newItem.onClick = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setShowLoginPrompt(true);
            if (originalOnClick) {
              originalOnClick(e);
            }
          };
          newItem.url = '#';
        }

        if (newItem.items) {
          newItem.items = processItems(newItem.items);
        }
        
        return newItem;
      });
    };
    return processItems(menuItems);
  }, [user, setShowLoginPrompt]);

  return <Navbar1 {...demoData} menu={processedMenu} auth={authLinks} />;
}

export { Navbar1Demo };
