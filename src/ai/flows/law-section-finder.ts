'use server';
/**
 * @fileOverview A flow to find and explain law sections of Bangladesh.
 *
 * - findLawSection - A function that finds details of a given law section.
 * - FindLawSectionInput - The input type for the findLawSection function.
 * - FindLawSectionOutput - The return type for the findLawSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindLawSectionInputSchema = z.object({
  query: z.string().describe('The law section number or name to search for.'),
});
export type FindLawSectionInput = z.infer<typeof FindLawSectionInputSchema>;

const FindLawSectionOutputSchema = z.object({
  sectionTitle: z.string().describe('The title of the law section found.'),
  sectionDetails: z.string().describe('The detailed explanation of the law section in Bangla.'),
});
export type FindLawSectionOutput = z.infer<typeof FindLawSectionOutputSchema>;

export async function findLawSection(input: FindLawSectionInput): Promise<FindLawSectionOutput> {
  return findLawSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findLawSectionPrompt',
  input: {schema: FindLawSectionInputSchema},
  output: {schema: FindLawSectionOutputSchema},
  prompt: `You are an expert on the laws of Bangladesh. The user wants to know about a specific law section. Based on their query, find the relevant law section and provide its title and a detailed explanation in simple, easy-to-understand Bangla.

User Query: {{{query}}}
`,
});

const findLawSectionFlow = ai.defineFlow(
  {
    name: 'findLawSectionFlow',
    inputSchema: FindLawSectionInputSchema,
    outputSchema: FindLawSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
