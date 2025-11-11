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
    const { history, message } = input;

    const systemPrompt = `আপনি 'অধিকারী' নামক একটি আইনি সহায়তা অ্যাপের জন্য একটি বন্ধুত্বপূর্ণ এবং সহায়ক AI সহকারী।
- আপনি শুধুমাত্র বাংলা ভাষায় উত্তর দেবেন।
- আপনার উত্তর বন্ধুত্বপূর্ণ, সংক্ষিপ্ত এবং সহায়ক হতে হবে।
- সাধারণ প্রশ্নের উত্তর দিন, যেমন অ্যাপের ব্যবহার, ফিচার সম্পর্কে জানা, ইত্যাদি।
- যদি ব্যবহারকারী আইনি প্রশ্ন করে বা আইনি পরামর্শ চায়, তাহলে তাদের 'AI আইনি চ্যাট' ফিচার ব্যবহার করার জন্য নির্দেশ দিন।
- আইনি পরামর্শ বা মতামত প্রদান করবেন না।
- আপনার উদ্দেশ্য হল অ্যাপ সম্পর্কে সাধারণ গাইড করা এবং ব্যবহারকারীদের সাহায্য করা।`;

    // ✅ Normalize history (avoid .find() / invalid type errors)
    const normalizedHistory = (history || []).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      content:
        typeof m.content === 'string'
          ? m.content
          : JSON.stringify(m.content),
    }));

    // ✅ Filter out system noise
    const filteredHistory = normalizedHistory.filter(
      (m) =>
        m.content !== GREETING_MESSAGE_CONTENT &&
        m.content !== ERROR_MESSAGE_CONTENT
    );

    try {
      // Check if API key is configured
      if (!process.env.GOOGLE_GENAI_API_KEY) {
        console.error('GOOGLE_GENAI_API_KEY is not set in environment variables');
        return { response: 'দুঃখিত, API কনফিগারেশন সমস্যা আছে। অনুগ্রহ করে সিস্টেম অ্যাডমিনিস্টেটরের সাথে যোগাযোগ করুন।' };
      }

      // ✅ Generate AI response using Gemini API (same format as law-chatbot)
      const { output } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: message,
        history: [
          { role: 'user', content: systemPrompt },
          { role: 'model', content: 'আমি বুঝতে পেরেছি। আমি এখন থেকে বাংলায় উত্তর দেব এবং ব্যবহারকারীদের সাহায্য করব।' },
          ...filteredHistory.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            content: m.content
          })),
        ],
        config: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        }
      });

      const responseText = output?.text?.trim();

      if (!responseText) {
        console.error('Empty response from Gemini API');
        return { response: ERROR_MESSAGE_CONTENT };
      }

      return { response: responseText };
    } catch (error) {
      console.error('Chatbot API error:', error);
      // Log more details for debugging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        // Check for specific error types
        if (error.message.includes('API key') || error.message.includes('authentication') || error.message.includes('401') || error.message.includes('403')) {
          return { response: 'API key সমস্যা আছে। অনুগ্রহ করে dev server restart করুন এবং .env.local file check করুন।' };
        }
        if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('rate limit')) {
          return { response: 'API quota limit exceeded. Please try again later.' };
        }
        // Return more detailed error for debugging (only in development)
        if (process.env.NODE_ENV === 'development') {
          return { response: `Error: ${error.message.substring(0, 100)}` };
        }
      }
      return { response: ERROR_MESSAGE_CONTENT };
    }
  }
);
