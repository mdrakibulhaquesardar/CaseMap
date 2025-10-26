
'use server';

/**
 * @fileOverview Summarizes legal documents from text or file uploads into simplified Bengali.
 *
 * - summarizeLegalDocument - A function that summarizes legal documents.
 * - SummarizeLegalDocumentInput - The input type for the summarizeLegalDocument function.
 * - SummarizeLegalDocumentOutput - The return type for the summarizeLegalDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLegalDocumentInputSchema = z.object({
  documentText: z.string().optional().describe('The legal document text to summarize.'),
  fileDataUri: z.string().optional().describe("A document file (image or PDF) as a data URI. Format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type SummarizeLegalDocumentInput = z.infer<typeof SummarizeLegalDocumentInputSchema>;

const SummarizeLegalDocumentOutputSchema = z.object({
  summary: z.string().describe('The simplified Bengali summary of the legal document.'),
});
export type SummarizeLegalDocumentOutput = z.infer<typeof SummarizeLegalDocumentOutputSchema>;

export async function summarizeLegalDocument(input: SummarizeLegalDocumentInput): Promise<SummarizeLegalDocumentOutput> {
  return summarizeLegalDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLegalDocumentPrompt',
  input: {schema: SummarizeLegalDocumentInputSchema},
  output: {schema: SummarizeLegalDocumentOutputSchema},
  prompt: `You are an AI assistant specializing in legal document summarization for citizens with limited legal knowledge. 
  
  Analyze the provided legal document (either from text or an uploaded file) and summarize it in simple, easy-to-understand Bengali.

  {{#if documentText}}
  Document Text:
  {{{documentText}}}
  {{/if}}

  {{#if fileDataUri}}
  Document File:
  {{media url=fileDataUri}}
  {{/if}}
  `,
});

const summarizeLegalDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeLegalDocumentFlow',
    inputSchema: SummarizeLegalDocumentInputSchema,
    outputSchema: SummarizeLegalDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    
