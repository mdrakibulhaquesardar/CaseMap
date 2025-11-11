
import type { CaseTimeline, FaqItem, LegalAidCenter } from "@/types";

export const caseTimelineData: { [key: string]: CaseTimeline } = {
  "12345": {
    caseNumber: "12345",
    title: "শ্রম বিরোধ - বেঙ্গল ফ্যাক্টরি",
    details: {
        caseType: "শ্রম আইন",
        filingDate: "2025-08-01",
        court: "ঢাকা শ্রম আদালত",
        status: "চলমান"
    },
    timeline: [
      { step: "মামলা দায়ের", date: "2025-08-01", status: "Completed", details: "অবৈতনিক মজুরির বিষয়ে কর্মচারী ইউনিয়ন কর্তৃক প্রাথমিক মামলা দায়ের করা হয়েছে।" },
      { step: "শুনানি ১: স্বীকৃতি", date: "2025-08-10", status: "Completed", details: "মামলা গ্রহণ এবং প্রতিপক্ষকে নোটিশ জারির জন্য প্রথম শুনানি।", documentLink: "#" },
      { step: "নথি জমা", date: "2025-08-25", status: "Completed", details: "উভয় পক্ষ তাদের প্রাথমিক প্রমাণ এবং ডকুমেন্টেশন জমা দিয়েছে।" },
      { step: "শুনানি ২: জেরা", date: "2025-09-05", status: "Upcoming", details: "প্রাথমিক সাক্ষীদের জেরার জন্য নির্ধারিত।" },
      { step: "চূড়ান্ত যুক্তি", date: "2025-09-15", status: "Upcoming", details: "উভয় আইন দলের দ্বারা চূড়ান্ত যুক্তি উপস্থাপন করা হবে।" },
      { step: "রায়", date: "2025-09-20", status: "Pending", details: "আদালতের চূড়ান্ত রায় মুলতবি রয়েছে।" },
    ],
  },
  "67890": {
    caseNumber: "67890",
    title: "সম্পত্তি উত্তরাধিকার দাবি",
     details: {
        caseType: "পারিবারিক আইন",
        filingDate: "2025-07-15",
        court: "সিলেট পারিবারিক আদালত",
        status: "চলমান"
    },
    timeline: [
        { step: "আবেদন দায়ের", date: "2025-07-15", status: "Completed", details: "পূর্বপুরুষের সম্পত্তির সঠিক উত্তরাধিকারের জন্য দাবি দায়ের করা হয়েছে।" },
        { step: "প্রতিপক্ষকে নোটিশ জারি", date: "2025-07-22", status: "Completed", details: "সকল জড়িত পক্ষকে সরকারি নোটিশ পাঠানো হয়েছে।" },
        { step: "প্রথম শুনানি", date: "2025-08-05", status: "Upcoming", details: "দাবির ভিত্তি প্রতিষ্ঠার জন্য প্রাথমিক শুনানি।" },
        { step: "মধ্যস্থতা অধিবেশন", date: "2025-08-20", status: "Pending", details: "নিষ্পত্তির চেষ্টার জন্য আদালত-আদেশিত মধ্যস্থতা অধিবেশন।" },
        { step: "চূড়ান্ত শুনানি", date: "2025-09-10", status: "Pending", details: "মধ্যস্থতা ব্যর্থ হলে চূড়ান্ত শুনানির জন্য নির্ধারিত।" },
    ]
  }
};

export const legalAidCenters: LegalAidCenter[] = [
  {
    name: "ব্লাস্ট আইনি সহায়তা কেন্দ্র",
    lat: 23.8103,
    lng: 90.4125,
    address: "বাড়ি ১২৩, রোড ৪, গুলশান, ঢাকা",
    contact: "০১২৩৪৫৬৭৮৯",
    image: "https://images.unsplash.com/photo-1629438756859-34a46dca018e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8YmFuZ2xhZGVzaCUyMGRoYWthfGVufDB8fHx8MTc2Mjg4NDA3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    services: ["মানবাধিকার", "পারিবারিক আইন", "ফৌজদারি আইন"],
    division: "ঢাকা",
  },
  {
    name: "ব্র্যাক মানবাধিকার ও আইনি সহায়তা পরিষেবা",
    lat: 23.78,
    lng: 90.4,
    address: "ব্র্যাক সেন্টার, ৭৫ মহাখালী, ঢাকা",
    contact: "০৯৮৭৬৫৪৩২১",
    image: "https://picsum.photos/400/250?random=2",
    services: ["শ্রম আইন", "মানবাধিকার", "ভূমি বিরোধ"],
    division: "ঢাকা",
  },
  {
    name: "আইন ও সালিশ কেন্দ্র (আসক)",
    lat: 23.7538,
    lng: 90.3832,
    address: "২৬/৩, বীর উত্তম কাজী নুরুজ্জামান রোড, পশ্চিম পান্থপথ, ঢাকা",
    contact: "০১৭১১২৩৪৪৩৪৪",
    image: "https://picsum.photos/400/250?random=3",
    services: ["পারিবারিক আইন", "ফৌজদারি আইন", "মানবাধিকার"],
    division: "ঢাকা",
  },
  {
    name: "চট্টগ্রাম আইনি সহায়তা অফিস",
    lat: 22.3569,
    lng: 91.8386,
    address: "জেলা জজ কোর্ট বিল্ডিং, চট্টগ্রাম",
    contact: "০৩১-৫৫৫৬৬৬",
    image: "https://picsum.photos/400/250?random=4",
    services: ["ভূমি বিরোধ", "ফৌজদারি আইন"],
    division: "চট্টগ্রাম",
  },
  {
    name: "সিলেট আইনি সহায়তা সমিতি",
    lat: 24.8949,
    lng: 91.8687,
    address: "জিন্দাবাজার, সিলেট",
    contact: "০১৯৯৮৮৭৭৬৬৫",
    image: "https://picsum.photos/400/250?random=5",
    services: ["পারিবারিক আইন", "শ্রম আইন"],
    division: "সিলেট",
  },
];


export const randomUserNames = [
  "আকাশ চৌধুরী", "বন্যা আহমেদ", "কামাল হাসান", "ডালিয়া খাতুন",
  "ইমন সরকার", "ফারজানা ইয়াসমিন", "গাজী রহমান", "হালিমা বিবি",
  "ইমরান খান", "জাহানারা ইমাম", "লায়লা সিদ্দিকা", "মিজানুর রহমান",
  "নাদিয়া ইসলাম", "ওমর ফারুক", "প্রিয়া দাস"
];
