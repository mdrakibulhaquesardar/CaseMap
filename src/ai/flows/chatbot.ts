
'use server';
/**
 * @fileOverview Chatbot flow for the অধিকারী app using Gemini.
 * Handles general user queries and provides support in Bengali.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// --- Zod Schemas ---
const ChatInputSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.any(), // allow any type, we'll normalize below
      })
    )
    .describe('Chat history array.'),
  message: z.string().describe("The user's message."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('AI-generated response text.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// --- Constants ---
const GREETING_MESSAGE_CONTENT =
  'আস-সালামু আলাইকুম! আমি আপনার আইনি সহকারী। আমি আপনাকে কীভাবে সাহায্য করতে পারি?';
const ERROR_MESSAGE_CONTENT =
  'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
const DEFAULT_RESPONSE = 'বর্তমানে আমরা এই ফিচারটি নিয়ে কাজ করছি। আমাদের টিম আপনাকে সেরা পরিষেবা দেওয়ার জন্য নিরলসভাবে চেষ্টা করছে এবং এর জন্য গবেষণা চালাচ্ছে। পাশাপাশি, আমাদের ক্লাউড ইনফ্রাস্ট্রাকচারের উন্নতির জন্য আমরা তহবিল সংগ্রহের চেষ্টা করছি। আপনার ধৈর্যের জন্য ধন্যবাদ।';

// --- Entry Function ---
export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

// --- Chat Flow Definition ---
const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    return { response: DEFAULT_RESPONSE };
  }
);
