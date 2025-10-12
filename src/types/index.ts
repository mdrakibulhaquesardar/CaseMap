import { FieldValue } from "firebase/firestore";

export type CaseTimelineStep = {
  step: string;
  date: string;
  status: 'Completed' | 'Upcoming' | 'Pending';
};

export type CaseTimeline = {
  id?: string;
  caseNumber: string;
  title: string;
  timeline: CaseTimelineStep[];
};

export type FaqAnswer = {
  id: string;
  content: string;
  author: string;
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
