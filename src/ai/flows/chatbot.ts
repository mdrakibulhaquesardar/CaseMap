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
    
    const systemPrompt = `You are a friendly and helpful assistant for a legal aid app in Bangladesh called 'Odhikar'. 
- Respond ONLY in Bengali. 
- Keep your answers concise and helpful for general queries.
- If the user asks a specific legal question, gently guide them to use the specialized 'AI আইনি চ্যাট' feature by saying: "আপনার আইনি প্রশ্নের জন্য, আমাদের বিশেষ 'AI আইনি চ্যাট' ব্যবহার করুন। আমি কি আপনাকে সেখানে নিয়ে যাব?"
- Do not provide legal advice.`;
    
    const { output } = await ai.generate({
      prompt: message,
      history: [
          { role: 'user', content: systemPrompt },
          { role: 'model', content: "আমি বুঝতে পেরেছি। আমি একজন বন্ধুত্বপূর্ণ সহকারী হিসেবে কাজ করব এবং শুধুমাত্র বাংলায় উত্তর দেব।" },
          ...history,
      ],
      config: {
        // You can adjust safety settings if needed
        // safetySettings: [{ category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }]
      }
    });

    return {
      response: output?.text ?? "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।",
    };
  }
);
