export type CaseTimelineStep = {
  step: string;
  date: string;
  status: 'Completed' | 'Upcoming' | 'Pending';
};

export type CaseTimeline = {
  caseNumber: string;
  title: string;
  timeline: CaseTimelineStep[];
};

export type FaqAnswer = {
  id: number;
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
  timestamp: string;
};

export type FaqItem = {
  id: number;
  question: string;
  tags: string[];
  answers: FaqAnswer[];
  timestamp: string;
};

export type LegalAidCenter = {
  name: string;
  lat: number;
  lng: number;
  address: string;
  contact: string;
};
