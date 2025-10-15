
import { PhonebookContact } from '@/types';

export const phonebookContacts: PhonebookContact[] = [
  // Emergency Services
  { id: '1', name: 'জাতীয় জরুরি সেবা', number: '999', category: 'জরুরি পরিষেবা' },
  { id: '2', name: 'ফায়ার সার্ভিস', number: '16163', category: 'জরুরি পরিষেবা' },
  { id: '3', name: 'অ্যাম্বুলেন্স', number: '999', category: 'জরুরি পরিষেবা' },
  
  // Law & Order
  { id: '4', name: 'পুলিশ হেডকোয়ার্টার্স', number: '01320000000', category: 'আইনশৃঙ্খলা বাহিনী' },
  { id: '5', name: 'র‍্যাপিড অ্যাকশন ব্যাটালিয়ন (র‍্যাব)', number: '10203', category: 'আইনশৃঙ্খলা বাহিনী' },
  { id: '6', name: 'ঢাকা মেট্রোপলিটন পুলিশ (ডিএমপি)', number: '02-55102222', category: 'আইনশৃঙ্খলা বাহিনী' },
  { id: '7', name: 'সাইবার পুলিশ', number: '01320000888', category: 'আইনশৃঙ্খলা বাহিনী' },

  // Legal & Consumer
  { id: '8', name: 'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর', number: '16121', category: 'আইনি ও ভোক্তা অধিকার' },
  { id: '9', name: 'জাতীয় আইনগত সহায়তা প্রদান সংস্থা', number: '16430', category: 'আইনি ও ভোক্তা অধিকার' },
  { id: '10', name: 'দুর্নীতি দমন কমিশন (দুদক)', number: '106', category: 'আইনি ও ভোক্তা অধিকার' },

  // Government Offices
  { id: '11', name: 'জাতীয় পরিচয়পত্র (NID) হেল্পলাইন', number: '105', category: 'সরকারি অফিস' },
  { id: '12', name: 'পাসপোর্ট অফিস', number: '02-55029034', category: 'সরকারি অফিস' },
  { id: '13', name: 'ঢাকা উত্তর সিটি কর্পোরেশন', number: '16106', category: 'সরকারি অফিস' },
  { id: '14', name: 'ঢাকা দক্ষিণ সিটি কর্পোরেশন', number: '16107', category: 'সরকারি অফিস' },

  // Health
  { id: '15', name: 'স্বাস্থ্য বাতায়ন', number: '16263', category: 'স্বাস্থ্য' },
  { id: '16', name: 'আইইডিসিআর (রোগতত্ত্ব)', number: '10655', category: 'স্বাস্থ্য' },
  { id: '17', name: 'ঢাকা মেডিকেল কলেজ হাসপাতাল', number: '02-55165000', category: 'স্বাস্থ্য' },

  // Utilities
  { id: '18', name: 'ডেসকো (বিদ্যুৎ)', number: '16120', category: 'ইউটিলিটি' },
  { id: '19', name: 'তিতাস গ্যাস', number: '16496', category: 'ইউটিলিটি' },
  { id: '20', name: 'ঢাকা ওয়াসা', number: '16162', category: 'ইউটিলিটি' },

  // Transport
  { id: '21', name: 'বাংলাদেশ রেলওয়ে', number: '16318', category: 'পরিবহন' },
  { id: '22', name: 'বিআরটিএ (BRTA)', number: '09610990998', category: 'পরিবহন' },
  { id: '23', name: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর', number: '09602-303040', category: 'পরিবহন' },
];
