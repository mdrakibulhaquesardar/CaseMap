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
export type LawChatOutput = z-infer<typeof LawChatOutputSchema>;

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
    const { history, message } = input;

    const systemPrompt = `You are an expert AI legal assistant for Bangladesh. Your role is to answer questions about Bangladeshi laws and citizens' rights accurately and clearly.
- Answer ONLY in Bengali.
- You can use the internet to ensure your information is up-to-date and accurate.
- When mentioning a specific law or section, cite it correctly (e.g., "দণ্ডবিধি, ১৮৬০-এর ৩০২ ধারা অনুযায়ী...").
- Provide helpful, informative, and easy-to-understand explanations.
- IMPORTANT: Always include a disclaimer at the end of every response: "দ্রষ্টব্য: এটি একটি AI-জেনারেটেড উত্তর এবং আইনি পরামর্শ হিসেবে গণ্য করা উচিত নয়। প্রয়োজনে একজন আইনজীবীর সাথে পরামর্শ করুন।"`;
    
    const { output } = await ai.generate({
      prompt: message,
      history: [
        { role: 'user', content: systemPrompt },
        { role: 'model', content: "আমি বুঝতে পেরেছি। আমি এখন থেকে বাংলাদেশের আইন সম্পর্কে বাংলায় উত্তর দেব এবং প্রতিটি উত্তরের শেষে একটি ডিসক্লেইমার যোগ করব।" },
        ...history,
      ],
      config: {
        // Using a model that is good with reasoning and web search
      }
    });

    const responseText = output.text ?? "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।";
    
    return {
      response: responseText,
    };
  }
);
