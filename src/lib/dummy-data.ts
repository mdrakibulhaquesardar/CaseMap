import type { CaseTimeline, FaqItem, LegalAidCenter } from "@/types";

export const caseTimelineData: { [key: string]: CaseTimeline } = {
  "12345": {
    caseNumber: "12345",
    title: "Labor Dispute - Bengal Factories",
    timeline: [
      { step: "Case Filed", date: "2025-08-01", status: "Completed" },
      { step: "Hearing 1", date: "2025-08-10", status: "Completed" },
      { step: "Document Submission", date: "2025-08-25", status: "Completed" },
      { step: "Hearing 2", date: "2025-09-05", status: "Upcoming" },
      { step: "Final Arguments", date: "2025-09-15", status: "Upcoming" },
      { step: "Judgment", date: "2025-09-20", status: "Pending" },
    ],
  },
  "67890": {
    caseNumber: "67890",
    title: "Property Inheritance Claim",
    timeline: [
        { step: "Application Filed", date: "2025-07-15", status: "Completed" },
        { step: "Notice Issued", date: "2025-07-22", status: "Completed" },
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
    services: ["Human Rights", "Family Law", "Criminal Law"],
    division: "Dhaka",
  },
  {
    name: "BRAC Human Rights & Legal Aid Services",
    lat: 23.78,
    lng: 90.4,
    address: "BRAC Centre, 75 Mohakhali, Dhaka",
    contact: "0987654321",
    image: "https://picsum.photos/400/250?random=2",
    services: ["Labor Law", "Human Rights", "Land Disputes"],
    division: "Dhaka",
  },
  {
    name: "Ain o Salish Kendra (ASK)",
    lat: 23.7538,
    lng: 90.3832,
    address: "26/3, Bir Uttam Kazi Nuruzzaman Road, West Panthapath, Dhaka",
    contact: "01711223344",
    image: "https://picsum.photos/400/250?random=3",
    services: ["Family Law", "Criminal Law", "Human Rights"],
    division: "Dhaka",
  },
  {
    name: "Chittagong Legal Aid Office",
    lat: 22.3569,
    lng: 91.8386,
    address: "District Judge Court Building, Chittagong",
    contact: "031-555666",
    image: "https://picsum.photos/400/250?random=4",
    services: ["Land Disputes", "Criminal Law"],
    division: "Chittagong",
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
    question: "What to do if a tenant does not vacate or pay rent?",
    tags: ["Property Law", "Tenant Rights"],
    author: {
        name: "Anisur Rahman",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a"
    },
    answers: [
      {
        id: 101,
        content:
          "The landlord must have a reasonable cause to evict a tenant. If rent is overdue or the landlord needs the house for personal use, they can ask the tenant to leave with a 30-day notice. If the tenant does not comply, a case can be filed in the appropriate court.",
        author: "AI Bot",
        upvotes: 12,
        downvotes: 0,
        timestamp: "2025-09-01T10:00:00Z",
      },
      {
        id: 102,
        content:
          "First, send a written notice. If that doesn't work, contact your local lawyer or a legal aid center. They will advise you on the eviction lawsuit process.",
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
    question: "How do I file a case under the Digital Security Act?",
    tags: ["Cybercrime", "Digital Security"],
    author: {
        name: "Salma Akhtar",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
    },
    answers: [
      {
        id: 201,
        content:
          "To file a case under the Digital Security Act, you need to file a complaint at the nearest police station. You must submit evidence such as screenshots, links, or other digital information with the complaint. The police will investigate the complaint and file a case if its found to be true.",
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
    question: "What are my legal rights as a worker?",
    tags: ["Labor Law", "Worker Rights"],
    author: {
        name: "Karim Khan",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c"
    },
    answers: [
      {
        id: 301,
        content:
          "According to the Bangladesh Labour Act, you have several fundamental rights. Such as: fixed working hours, weekly holidays, timely payment of wages and allowances, a safe working environment, and the right to an appointment letter. If you face any issues, you can file a complaint with the Labour Court.",
        author: "AI Bot",
        upvotes: 18,
        downvotes: 1,
        timestamp: "2025-08-25T11:00:00Z",
      },
       {
        id: 302,
        content: "First, talk to your company's HR department. If the issue is not resolved, you can file a complaint with the Department of Inspection for Factories and Establishments (DIFE).",
        author: "Community User",
        upvotes: 8,
        downvotes: 0,
        timestamp: "2025-08-25T11:15:00Z",
      }
    ],
    timestamp: "2025-08-25T10:55:00Z",
  },
];

    