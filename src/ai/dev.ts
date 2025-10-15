'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/community-legal-q-and-a.ts';
import '@/ai/flows/legal-document-summarization.ts';
import '@/ai/flows/legal-tool-recommendation.ts';
import '@/ai/flows/law-section-finder.ts';
import '@/ai/flows/chatbot.ts';
import '@/ai/flows/law-chatbot.ts';
