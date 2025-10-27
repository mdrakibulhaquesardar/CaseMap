'use server';
/**
 * @fileOverview A flow to find and explain law sections of Bangladesh.
 *
 * - findLawSection - A function that finds details of a given law section.
 * - FindLawSectionInput - The input type for the findLawSection function.
 * - FindLawSectionOutput - The return type for the findLawsection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindLawSectionInputSchema = z.object({
  query: z.string().describe('The law section number or name to search for in Bengali.'),
});
export type FindLawSectionInput = z.infer<typeof FindLawSectionInputSchema>;

const FindLawSectionOutputSchema = z.object({
  sectionTitle: z.string().describe('The title of the law section found in Bengali.'),
  sectionDetails: z.string().describe('The detailed explanation of the law section in simple Bengali.'),
});
export type FindLawSectionOutput = z.infer<typeof FindLawSectionOutputSchema>;

export async function findLawSection(input: FindLawSectionInput): Promise<FindLawSectionOutput> {
  return findLawSectionFlow(input);
}

const findLawSectionFlow = ai.defineFlow(
  {
    name: 'findLawSectionFlow',
    inputSchema: FindLawSectionInputSchema,
    outputSchema: FindLawSectionOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt: `You are an expert on the laws of Bangladesh. The user wants to know about a specific law section. Based on their query, find the relevant law section and provide its title and a detailed explanation in simple, easy-to-understand Bengali.

User Query: ${input.query}
`,
        output: {
            schema: FindLawSectionOutputSchema,
        },
    });
    if (!output) {
      throw new Error('AI failed to find the law section.');
    }
    return output;
  }
);
