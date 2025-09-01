import type { CaseTimeline, FaqItem, LegalAidCenter } from "@/types";

export const caseTimelineData: { [key: string]: CaseTimeline } = {
  "12345": {
    caseNumber: "12345",
    title: "Labor Dispute - Bangla Factory",
    timeline: [
      { step: "Case Filed", date: "2025-08-01", status: "Completed" },
      { step: "Hearing 1", date: "2025-08-10", status: "Completed" },
      { step: "Document Submission", date: "2025-08-25", status: "Completed" },
      { step: "Hearing 2", date: "2025-09-05", status: "Upcoming" },
      { step: "Final Argument", date: "2025-09-15", status: "Upcoming" },
      { step: "Judgement", date: "2025-09-20", status: "Pending" },
    ],
  },
  "67890": {
    caseNumber: "67890",
    title: "Property Inheritance Claim",
    timeline: [
        { step: "Petition Filed", date: "2025-07-15", status: "Completed" },
        { step: "Notice Served", date: "2025-07-22", status: "Completed" },
        { step: "First Hearing", date: "2025-08-05", status: "Upcoming" },
        { step: "Mediation", date: "2025-08-20", status: "Pending" },
        { step: "Final Hearing", date: "2025-09-10", status: "Pending" },
    ]
  }
};

export const legalAidCenters: LegalAidCenter[] = [
  {
    name: "BLAST Legal Aid Center",
    lat: 23.8103,
    lng: 90.4125,
    address: "House 123, Road 4, Gulshan, Dhaka",
    contact: "0123456789",
    image: "https://picsum.photos/400/250?random=1",
    services: ["Human Rights", "Family Law", "Criminal Case"],
    division: "Dhaka",
  },
  {
    name: "BRAC Human Rights & Legal Aid Services",
    lat: 23.78,
    lng: 90.4,
    address: "BRAC Centre, 75 Mohakhali, Dhaka",
    contact: "0987654321",
    image: "https://picsum.photos/400/250?random=2",
    services: ["Labor Law", "Human Rights", "Land Dispute"],
    division: "Dhaka",
  },
  {
    name: "Ain o Salish Kendra (ASK)",
    lat: 23.7538,
    lng: 90.3832,
    address: "26/3, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka",
    contact: "01711223344",
    image: "https://picsum.photos/400/250?random=3",
    services: ["Family Law", "Criminal Case", "Human Rights"],
    division: "Dhaka",
  },
  {
    name: "Chattogram Legal Aid Office",
    lat: 22.3569,
    lng: 91.8386,
    address: "District Judge Court Building, Chattogram",
    contact: "031-555666",
    image: "https://picsum.photos/400/250?random=4",
    services: ["Land Dispute", "Criminal Case"],
    division: "Chattogram",
  },
  {
    name: "Sylhet Legal Aid Association",
    lat: 24.8949,
    lng: 91.8687,
    address: "Zindabazar, Sylhet",
    contact: "01998877665",
    image: "https://picsum.photos/400/250?random=5",
    services: ["Family Law", "Labor Law"],
    division: "Sylhet",
  },
];

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "ভাড়াটিয়া বাসা না ছাড়লে বা ভাড়া না দিলে করণীয় কি?",
    tags: ["Property Law", "Tenant Rights"],
    author: {
        name: "Anisur Rahman",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a"
    },
    answers: [
      {
        id: 101,
        content:
          "বাড়িওয়ালা ভাড়াটিয়াকে উচ্ছেদ করতে চাইলে যুক্তিসঙ্গত কারণ থাকতে হবে। ভাড়া বাকি পড়লে বা বাড়িওয়ালা নিজে থাকার জন্য বাসার প্রয়োজন হলে ৩০ দিন আগে নোটিশ দিয়ে বাসা ছাড়তে বলতে পারেন। ভাড়াটিয়া না ছাড়লে উপযুক্ত আদালতে মামলা করা যাবে।",
        author: "AI Bot",
        upvotes: 12,
        downvotes: 0,
        timestamp: "2025-09-01T10:00:00Z",
      },
      {
        id: 102,
        content:
          "প্রথমে লিখিত নোটিশ পাঠান। কাজ না হলে, আপনার স্থানীয় আইনজীবী বা লিগ্যাল এইড সেন্টারের সাথে যোগাযোগ করুন। তারা আপনাকে উচ্ছেদ মামলার বিষয়ে সঠিক পরামর্শ দেবে।",
        author: "Community User",
        upvotes: 5,
        downvotes: 1,
        timestamp: "2025-09-01T12:00:00Z",
      },
    ],
    timestamp: "2025-09-01T09:50:00Z",
  },
  {
    id: 2,
    question: "ডিজিটাল নিরাপত্তা আইনে মামলা কিভাবে করব?",
    tags: ["Cyber Crime", "Digital Security"],
    author: {
        name: "Salma Akter",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
    },
    answers: [
      {
        id: 201,
        content:
          "ডিজিটাল নিরাপত্তা আইনে মামলা করতে হলে, আপনাকে নিকটস্থ থানায় গিয়ে অভিযোগ দায়ের করতে হবে। অভিযোগের সাথে প্রমাণ হিসেবে স্ক্রিনশট, লিংক বা অন্যান্য ডিজিটাল তথ্য জমা দিতে হবে। পুলিশ অভিযোগটি তদন্ত করে দেখবে এবং সত্যতা পেলে মামলা রুজু করবে।",
        author: "AI Bot",
        upvotes: 25,
        downvotes: 2,
        timestamp: "2025-08-28T14:30:00Z",
      },
    ],
    timestamp: "2025-08-28T14:25:00Z",
  },
  {
    id: 3,
    question: "শ্রমিক হিসেবে আমার আইনি অধিকার কী কী?",
    tags: ["Labor Law", "Worker Rights"],
    author: {
        name: "Karim Khan",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c"
    },
    answers: [
      {
        id: 301,
        content:
          "বাংলাদেশ শ্রম আইন অনুযায়ী, আপনার কিছু মৌলিক অধিকার রয়েছে। যেমন: নির্দিষ্ট কর্মঘণ্টা, সাপ্তাহিক ছুটি, বেতন ও ভাতা সময়মতো পাওয়া, নিরাপদ কর্মপরিবেশ এবং নিয়োগপত্র পাওয়ার অধিকার। কোনো সমস্যা হলে আপনি শ্রম আদালতে অভিযোগ করতে পারেন।",
        author: "AI Bot",
        upvotes: 18,
        downvotes: 1,
        timestamp: "2025-08-25T11:00:00Z",
      },
       {
        id: 302,
        content: "আপনার কোম্পানির HR বিভাগের সাথে প্রথমে কথা বলুন। যদি সমাধান না হয়, তাহলে কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তরে (DIFE) অভিযোগ জানাতে পারেন।",
        author: "Community User",
        upvotes: 8,
        downvotes: 0,
        timestamp: "2025-08-25T11:15:00Z",
      }
    ],
    timestamp: "2025-08-25T10:55:00Z",
  },
];
