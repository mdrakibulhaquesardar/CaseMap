'use server';
/**
 * @fileOverview Community Legal Q&A flow that allows users to ask legal questions and get AI-based answers.
 *
 * - askLegalQuestion - A function that handles the legal question and answer process.
 * - AskLegalQuestionInput - The input type for the askLegalQuestion function.
 * - AskLegalQuestionOutput - The return type for the askLegalQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskLegalQuestionInputSchema = z.object({
  question: z.string().describe('The legal question asked by the user in Bengali.'),
});
export type AskLegalQuestionInput = z.infer<typeof AskLegalQuestionInputSchema>;

const AskLegalQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the legal question in Bengali.'),
});
export type AskLegalQuestionOutput = z.infer<typeof AskLegalQuestionOutputSchema>;

export async function askLegalQuestion(input: AskLegalQuestionInput): Promise<AskLegalQuestionOutput> {
  return askLegalQuestionFlow(input);
}

const askLegalQuestionFlow = ai.defineFlow(
  {
    name: 'askLegalQuestionFlow',
    inputSchema: AskLegalQuestionInputSchema,
    outputSchema: AskLegalQuestionOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt: `You are a helpful AI assistant specialized in providing legal information related to Bangladesh.

Please answer the following legal question in a clear and concise manner in Bengali. Always provide a disclaimer at the end that this is not legal advice and a professional lawyer should be consulted.

Question: ${input.question}
`,
        output: {
            schema: AskLegalQuestionOutputSchema,
        },
    });

    if (!output) {
      throw new Error('AI failed to generate a response for the legal question.');
    }
    return output;
  }
);
