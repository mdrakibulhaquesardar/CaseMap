
import { FieldValue } from "firebase/firestore";

export type CaseTimelineStep = {
  step: string;
  date: string;
  status: 'Completed' | 'Upcoming' | 'Pending';
  details?: string;
  documentLink?: string;
};

export type CaseTimeline = {
  id?: string;
  caseNumber: string;
  title: string;
  details: {
    caseType: string;
    filingDate: string;
    court: string;
    status: string;
  },
  timeline: CaseTimelineStep[];
};

export type FaqAnswer = {
  id: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  upvotes: number;
  downvotes: number;
  timestamp: string;
};

export type FaqItem = {
  id: string;
  question: string;
  tags: string[];
  answers: FaqAnswer[];
  timestamp: FieldValue | string;
  author: {
    name: string;
    avatar: string;
  };
  recommendation?: {
      toolRecommendation: string;
      suitabilityReasoning: string;
      content: string;
  };
  originalId?: string;
};

export type LegalAidCenter = {
  name: string;
  lat: number;
  lng: number;
  address: string;
  contact: string;
  image: string;
  services: string[];
  division: string;
};

export type LibraryDocument = {
  slug: string;
  title: string;
  author: string;
  category: 'All' |'Constitution' | 'Law & Acts' | 'Legal Awareness' | 'Books / Publications' | 'Rights & Guidelines';
  published: string;
  filePath: string;
  thumbnail?: string;
};

export type PhonebookContact = {
  id: string;
  name: string;
  number: string;
  category: 'জরুরি পরিষেবা' | 'আইনশৃঙ্খলা বাহিনী' | 'আইনি ও ভোক্তা অধিকার' | 'সরকারি অফিস' | 'স্বাস্থ্য' | 'ইউটিলিটি' | 'পরিবহন';
};
