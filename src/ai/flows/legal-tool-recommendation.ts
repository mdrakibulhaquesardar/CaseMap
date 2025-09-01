'use server';

/**
 * @fileOverview Provides personalized recommendations for appropriate legal tools to address user's legal questions.
 *
 * - legalToolRecommendation - A function that provides personalized recommendations for legal tools.
 * - LegalToolRecommendationInput - The input type for the legalToolRecommendation function.
 * - LegalToolRecommendationOutput - The return type for the legalToolRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalToolRecommendationInputSchema = z.object({
  legalQuestion: z.string().describe('The legal question asked by the user.'),
});
export type LegalToolRecommendationInput = z.infer<typeof LegalToolRecommendationInputSchema>;

const LegalToolRecommendationOutputSchema = z.object({
  toolRecommendation: z.string().describe('The recommended legal tool for the user question, with a brief explanation of why this tool is recommended.'),
  suitabilityReasoning: z.string().describe('Reasoning as to why the tool is suitable for the legal question.'),
});
export type LegalToolRecommendationOutput = z.infer<typeof LegalToolRecommendationOutputSchema>;

export async function legalToolRecommendation(input: LegalToolRecommendationInput): Promise<LegalToolRecommendationOutput> {
  return legalToolRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalToolRecommendationPrompt',
  input: {schema: LegalToolRecommendationInputSchema},
  output: {schema: LegalToolRecommendationOutputSchema},
  prompt: `You are an AI assistant that recommends the most appropriate legal tool for a given user question. Consider tools like legal aid finders, document summarizers, or timeline viewers.

User Question: {{{legalQuestion}}}

Based on the question, provide a tool recommendation and explain why it is suitable for the user's legal needs.

Tool Recommendation:`, // Ensure the LLM knows to recommend a *tool*.
});

const legalToolRecommendationFlow = ai.defineFlow(
  {
    name: 'legalToolRecommendationFlow',
    inputSchema: LegalToolRecommendationInputSchema,
    outputSchema: LegalToolRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
