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
      title: "হোম",
      url: "/",
    },
    {
      title: "টাইমলাইন",
      url: "/timeline",
    },
    {
      title: "সারসংক্ষেপ",
      url: "/summarizer",
    },
    {
      title: "প্রশ্নোত্তর",
      url: "/faq",
    },
    {
      title: "আইনি সহায়তা",
      url: "/legal-aid",
    },
    {
      title: "আইন খোঁজকারী",
      url: "/law-finder",
    },
     {
      title: "আমাদের সম্পর্কে",
      url: "/about",
    },
  ],
  mobileExtraLinks: [
    { name: "প্রোফাইল", url: "/profile" },
    { name: "সেটিংস", url: "/profile/settings" },
    { name: "গোপনীয়তা", url: "#" },
    { name: "শর্তাবলী", url: "#" },
  ],
  auth: {
    login: { text: "লগইন", url: "#" },
    signup: { text: "সাইন আপ", url: "#" },
  },
};

function Navbar1Demo() {
  return <Navbar1 {...demoData} />;
}

export { Navbar1Demo };
