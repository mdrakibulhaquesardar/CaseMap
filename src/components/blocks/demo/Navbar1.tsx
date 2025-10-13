
"use client";

import { Navbar1 } from "@/components/blocks/Navbar1";
import { useUser } from "@/firebase/auth/use-user";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const allMenuItems = [
    {
      title: "হোম",
      url: "/",
      auth: false,
    },
    {
      title: "টাইমলাইন",
      url: "/timeline",
      auth: true,
    },
    {
      title: "সারসংক্ষেপ",
      url: "/summarizer",
      auth: true,
    },
    {
      title: "প্রশ্নোত্তর",
      url: "/faq",
      auth: true,
    },
    {
      title: "আইনি সহায়তা",
      url: "/legal-aid",
      auth: true,
    },
    {
      title: "আইন অনুসন্ধান",
      url: "/law-finder",
      auth: false,
    },
     {
      title: "আমাদের সম্পর্কে",
      url: "/about",
      auth: false,
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
  auth: {
    login: { text: "লগ ইন", url: "/login" },
    signup: { text: "সাইন আপ", url: "/signup" },
  },
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
        return allMenuItems.filter(item => !item.auth);
    }
    if (user) {
        return allMenuItems;
    }
    return allMenuItems.filter(item => !item.auth);
  }, [user, isLoading]);


  if (isLoading) {
    const loadingMenu = allMenuItems.filter(item => !item.auth);
    return <Navbar1 {...demoData} menu={loadingMenu} auth={demoData.auth} />;
  }

  return <Navbar1 {...demoData} menu={menuItems} auth={authLinks} />;
}

export { Navbar1Demo };
