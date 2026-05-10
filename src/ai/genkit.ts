import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // Gemma 2 is the primary efficient model for high-cap text generation
  model: 'googleai/gemma-2-9b-it',
});
