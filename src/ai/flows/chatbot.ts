
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
  response: z.string().describe('The AI-generated response in English.'),
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
- Your primary language is English. You MUST respond in English.
- Keep your answers friendly, concise, and helpful for general, non-legal queries.
- If the user asks a specific legal question or asks for legal advice, you MUST NOT answer it. Instead, you MUST gently guide them to use the specialized 'AI আইনি চ্যাট' (AI Legal Chat) feature by saying EXACTLY this: "For your legal question, please use our specialized 'AI Legal Chat' feature. I can take you there, or you can find it in the Tools menu."
- Do not provide any legal opinions or advice under any circumstances. Your purpose is to be a general guide for the app.`;
    
    const { output } = await ai.generate({
      model: 'googleai/gemini-pro',
      prompt: message,
      history: [
          { role: 'user', content: systemPrompt },
          { role: 'model', content: "I understand. I will act as a general assistant for the 'Odhikar' app and respond only in English. I will not provide any legal advice and will direct users to the 'AI Legal Chat' feature for legal questions." },
          ...history.filter(m => m.content !== GREETING_MESSAGE_CONTENT && m.content !== ERROR_MESSAGE_CONTENT),
      ],
    });

    const responseText = output?.text;
    if (!responseText) {
      throw new Error("AI failed to generate a response.");
    }
    
    return {
      response: responseText,
    };
  }
);

const GREETING_MESSAGE_CONTENT = 'আস-সালামু আলাইকুম! আমি আপনার আইনি সহকারী। আমি আপনাকে কীভাবে সাহায্য করতে পারি?';
const ERROR_MESSAGE_CONTENT = 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
