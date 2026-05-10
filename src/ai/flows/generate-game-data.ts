'use server';
/**
 * @fileOverview Procedural game deck generator.
 * Uses Gemma 2 as primary and Gemini with Search as fallback.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GameEntitySchema = z.object({
  name: z.string(),
  value: z.number(),
  unit: z.string(),
  type: z.string(),
  imageHint: z.string(),
});

const GenerateGameDataInputSchema = z.object({
  topic: z.string(),
  count: z.number().default(10),
  difficulty: z.enum(['casual', 'expert']).default('casual'),
});
export type GenerateGameDataInput = z.infer<typeof GenerateGameDataInputSchema>;

const GenerateGameDataOutputSchema = z.object({
  entities: z.array(GameEntitySchema),
});
export type GenerateGameDataOutput = z.infer<typeof GenerateGameDataOutputSchema>;

/**
 * Enhanced retry logic that handles both primary and fallback model exhaustion.
 */
async function withRetry<T>(fn: () => Promise<T>, fallbackFn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: any;
  
  // Try primary (Gemma)
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const msg = err.message || '';
      const isQuota = msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED');
      if (isQuota) break; // Move to fallback immediately on quota hit
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }

  // Try fallback (Gemini with Search) with its own retry loop
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fallbackFn();
    } catch (err: any) {
      lastError = err;
      const msg = err.message || '';
      const isQuota = msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED');
      if (!isQuota) throw err; // Fatal error, not just quota
      // Quota hit on fallback, wait longer (2s, 4s...)
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
  
  throw lastError;
}

export async function generateGameData(input: GenerateGameDataInput): Promise<GenerateGameDataOutput> {
  // Ultra-concise prompt to save tokens
  const promptText = `Facts for "{{topic}}". Count: {{count}}. Diff: {{difficulty}} (casual=famous, expert=niche). JSON only: name, value, unit, type, imageHint(2 words). Same units.`;

  const runGemma = async () => {
    const {output} = await ai.generate({
      model: 'googleai/gemma-2-9b-it',
      prompt: promptText,
      input,
      output: {schema: GenerateGameDataOutputSchema},
    });
    return output!;
  };

  const runGeminiWithSearch = async () => {
    const {output} = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: promptText,
      input,
      output: {schema: GenerateGameDataOutputSchema},
      config: {
        // @ts-ignore - Search grounding for factual accuracy
        googleSearchRetrieval: {}
      }
    });
    return output!;
  };

  return withRetry(runGemma, runGeminiWithSearch);
}
