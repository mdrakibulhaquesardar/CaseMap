
'use server';
/**
 * @fileOverview A simple chatbot flow that uses Gemini to generate responses.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The chat history.'),
  message: z.string().describe('The user\'s message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response in Bengali.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { history, message } = input;
    
    const systemPrompt = `You are a friendly and helpful general assistant for a legal aid app in Bangladesh called 'Odhikar'. 
- Your primary language is Bengali. You MUST respond in Bengali.
- Keep your answers friendly, concise, and helpful for general, non-legal queries.
- If the user asks a specific legal question or asks for legal advice, you MUST NOT answer it. Instead, you MUST gently guide them to use the specialized 'AI আইনি চ্যাট' (AI Legal Chat) feature by saying EXACTLY this: "আপনার আইনি প্রশ্নের জন্য, আমাদের বিশেষ 'AI আইনি চ্যাট' ফিচারটি ব্যবহার করুন। আমি আপনাকে সেখানে নিয়ে যেতে পারি অথবা আপনি টুলস মেন্যু থেকে যেতে পারেন।"
- Do not provide any legal opinions or advice under any circumstances. Your purpose is to be a general guide for the app.`;
    
    const { output } = await ai.generate({
      prompt: message,
      history: [
          { role: 'user', content: systemPrompt },
          { role: 'model', content: "আমি বুঝতে পেরেছি। আমি 'অধিকার' অ্যাপের জন্য একজন সাধারণ সহকারী হিসেবে কাজ করব এবং শুধুমাত্র বাংলায় উত্তর দেব। আমি কোনো আইনি পরামর্শ দেব না এবং আইনি প্রশ্নের জন্য ব্যবহারকারীদের 'AI আইনি চ্যাট' ফিচারে পাঠাব।" },
          ...history,
      ],
    });

    return {
      response: output?.text ?? "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।",
    };
  }
);
