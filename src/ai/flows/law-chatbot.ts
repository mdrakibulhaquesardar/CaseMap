
'use server';
/**
 * @fileOverview A chatbot flow specialized in Bangladeshi law and rights.
 *
 * - lawChat - A function that handles the legal chatbot conversation.
 * - LawChatInput - The input type for the lawChat function.
 * - LawChatOutput - The return type for the lawChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LawChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The chat history.'),
  message: z.string().describe('The user\'s legal question in Bengali.'),
});
export type LawChatInput = z.infer<typeof LawChatInputSchema>;

const LawChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated legal information in Bengali.'),
});
export type LawChatOutput = z.infer<typeof LawChatOutputSchema>;

const DEFAULT_RESPONSE = 'বর্তমানে আমরা এই ফিচারটি নিয়ে কাজ করছি। আমাদের টিম আপনাকে সেরা পরিষেবা দেওয়ার জন্য নিরলসভাবে চেষ্টা করছে এবং এর জন্য গবেষণা চালাচ্ছে। পাশাপাশি, আমাদের ক্লাউড ইনফ্রাস্ট্রাকচারের উন্নতির জন্য আমরা তহবিল সংগ্রহের চেষ্টা করছি। আপনার ধৈর্যের জন্য ধন্যবাদ।';

export async function lawChat(input: LawChatInput): Promise<LawChatOutput> {
  return lawChatFlow(input);
}

const lawChatFlow = ai.defineFlow(
  {
    name: 'lawChatFlow',
    inputSchema: LawChatInputSchema,
    outputSchema: LawChatOutputSchema,
  },
  async (input) => {
    return { response: DEFAULT_RESPONSE };
  }
);
