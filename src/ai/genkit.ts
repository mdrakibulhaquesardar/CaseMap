import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize Genkit with Google AI plugin and default model
export const ai = genkit({
  plugins: [googleAI()],
  defaultModel: 'googleai/gemini-2.5-flash', // or whichever Gemini model you want
});
