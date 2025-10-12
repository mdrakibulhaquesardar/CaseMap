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


export const randomUserNames = [
  "Akash Chowdhury", "Bonna Ahmed", "Kamal Hasan", "Dalia Khatun",
  "Emon Sarkar", "Farzana Yasmin", "Gazi Rahman", "Halima Bibi",
  "Imran Khan", "Jahanara Imam", "Laila Siddiqui", "Mizanur Rahman",
  "Nadia Islam", "Omar Faruk", "Priya Das"
];
