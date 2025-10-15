
"use client";

import { Navbar1 } from "@/components/blocks/Navbar1";
import { useUser } from "@/firebase/auth/use-user";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  BookOpen,
  FileText,
  Gavel,
  MessageSquare,
  Users,
  Info,
  Bot
} from "lucide-react";


const loggedOutMenu = [
  {
    title: "হোম",
    url: "/",
  },
  {
    title: "আইন অনুসন্ধান",
    url: "/law-finder",
  },
   {
    title: "আমাদের সম্পর্কে",
    url: "/about",
  },
];

const loggedInMenu = [
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
          description: "AI এর সাথে কথা বলে আইনি তথ্য জানুন।",
          icon: <Bot className="size-5 shrink-0" />,
          url: "/chatbot",
        },
        {
          title: "মামলার টাইমলাইন",
          description: "আপনার মামলার অগ্রগতি ট্র্যাক করুন।",
          icon: <Gavel className="size-5 shrink-0" />,
          url: "/timeline",
        },
        {
          title: "নথি সারসংক্ষেপ",
          description: "জটিল আইনি নথি সহজে বুঝুন।",
          icon: <FileText className="size-5 shrink-0" />,
          url: "/summarizer",
        },
        {
          title: "আইনি সহায়তা",
          description: "কাছাকাছি আইনি সহায়তা কেন্দ্র খুঁজুন।",
          icon: <Users className="size-5 shrink-0" />,
          url: "/legal-aid",
        },
        {
          title: "আইন অনুসন্ধান",
          description: "বাংলাদেশের আইন ও ধারা সম্পর্কে জানুন।",
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
          description: "আপনার আইনি প্রশ্ন জিজ্ঞাসা করুন।",
          icon: <MessageSquare className="size-5 shrink-0" />,
          url: "/faq",
        },
      ],
    },
    {
      title: "আমাদের সম্পর্কে",
      url: "/about",
    },
];


const demoData = {
  logo: {
    url: "/",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "CaseMap Legal Companion",
    title: "CaseMap",
  },
  mobileExtraLinks: [
    { name: "প্রোফাইল", url: "/profile" },
    { name: "সেটিংস", url: "/profile/settings" },
    { name: "গোপনীয়তা", url: "#" },
    { name: "শর্তাবলী", url: "#" },
  ],
};

function Navbar1Demo() {
  const { user, isLoading } = useUser();
  const router = useRouter();

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

  const menuItems = useMemo(() => {
    if (isLoading) {
        return loggedOutMenu;
    }
    if (user) {
        return loggedInMenu;
    }
    return loggedOutMenu;
  }, [user, isLoading]);


  if (isLoading) {
    return <Navbar1 {...demoData} menu={loggedOutMenu} auth={authLinks} />;
  }

  return <Navbar1 {...demoData} menu={menuItems} auth={authLinks} />;
}

export { Navbar1Demo };
