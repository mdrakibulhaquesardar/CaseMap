'use server';
/**
 * @fileOverview Chatbot flow for the অধিকারী app using Gemini.
 * Handles general user queries but redirects legal ones to AI Legal Chat.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// --- Zod Schemas ---
const ChatInputSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.any(), // allow any type, we’ll normalize below
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

    const systemPrompt = `
You are a friendly and helpful general assistant for a legal aid app in Bangladesh called 'অধিকারী'. 
- Your primary language is English. You MUST respond in English.
- Keep your answers friendly, concise, and helpful for general, non-legal queries.
- If the user asks a specific legal question or asks for legal advice, you MUST NOT answer it. 
  Instead, you MUST gently guide them to use the specialized 'AI আইনি চ্যাট' (AI Legal Chat) feature by saying EXACTLY this: 
  "For your legal question, please use our specialized 'AI Legal Chat' feature. I can take you there, or you can find it in the Tools menu."
- Do not provide any legal opinions or advice under any circumstances. 
  Your purpose is to be a general guide for the app.
    `.trim();

    // ✅ Normalize history (avoid .find() / invalid type errors)
    const normalizedHistory = (history || []).map((m) => ({
      role: m.role,
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

    // ✅ Generate AI response
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'assistant',
          content:
            "I understand. I will act as a general assistant for the 'অধিকারী' app and respond only in English. I will not provide any legal advice and will direct users to the 'AI Legal Chat' feature for legal questions.",
        },
        ...filteredHistory,
        { role: 'user', content: message },
      ],
    });

    const responseText = output?.text?.trim();

    if (!responseText) {
      return { response: "Sorry, I'm unable to respond right now." };
    }

    return { response: responseText };
  }
);
