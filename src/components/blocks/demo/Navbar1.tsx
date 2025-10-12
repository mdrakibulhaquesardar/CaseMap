
"use client";

import { Navbar1 } from "@/components/blocks/Navbar1";
import { useUser } from "@/firebase/auth/use-user";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const allMenuItems = [
    {
      title: "Home",
      url: "/",
      auth: false,
    },
    {
      title: "Timeline",
      url: "/timeline",
      auth: true,
    },
    {
      title: "Summarizer",
      url: "/summarizer",
      auth: true,
    },
    {
      title: "Q&A",
      url: "/faq",
      auth: true,
    },
    {
      title: "Legal Aid",
      url: "/legal-aid",
      auth: true,
    },
    {
      title: "Law Finder",
      url: "/law-finder",
      auth: true,
    },
     {
      title: "About Us",
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
    { name: "Profile", url: "/profile" },
    { name: "Settings", url: "/profile/settings" },
    { name: "Privacy", url: "#" },
    { name: "Terms", url: "#" },
  ],
  auth: {
    login: { text: "Log in", url: "/login" },
    signup: { text: "Sign up", url: "/signup" },
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
        login: { text: "Profile", url: "/profile" },
        signup: { text: "Sign out", url: "#", onClick: handleSignOut },
      }
    : {
        login: { text: "Log in", url: "/login" },
        signup: { text: "Sign up", url: "/signup" },
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
