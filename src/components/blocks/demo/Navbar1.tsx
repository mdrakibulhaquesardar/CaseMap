import { Book, Sunset, Trees, Zap } from "lucide-react";

import { Navbar1 } from "@/components/blocks/Navbar1";

const demoData = {
  logo: {
    url: "/",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "CaseMap Legal Companion",
    title: "CaseMap",
  },
  menu: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Timeline",
      url: "/timeline",
    },
    {
      title: "Summarizer",
      url: "/summarizer",
    },
    {
      title: "Q&A",
      url: "/faq",
    },
    {
      title: "Legal Aid",
      url: "/legal-aid",
    },
    {
      title: "Law Finder",
      url: "/law-finder",
    },
     {
      title: "About",
      url: "/about",
    },
  ],
  mobileExtraLinks: [
    { name: "Profile", url: "/profile" },
    { name: "Settings", url: "/profile/settings" },
    { name: "Privacy", url: "#" },
    { name: "Terms", url: "#" },
  ],
  auth: {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
};

function Navbar1Demo() {
  return <Navbar1 {...demoData} />;
}

export { Navbar1Demo };
