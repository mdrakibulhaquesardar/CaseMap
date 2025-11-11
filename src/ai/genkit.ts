import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize Genkit with Google AI plugin and default model
// The API key should be set in environment variable: GOOGLE_GENAI_API_KEY
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  defaultModel: 'googleai/gemini-2.5-flash',
});
