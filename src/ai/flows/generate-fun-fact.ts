'use server';
/**
 * @fileOverview Educational insight generator.
 * Uses Gemma 2 for efficiency with Gemini fallback.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFunFactInputSchema = z.object({
  entity1Name: z.string(),
  entity1Value: z.string(),
  entity1Unit: z.string().optional(),
  entity2Name: z.string(),
  entity2Value: z.string(),
  entity2Unit: z.string().optional(),
  comparisonType: z.string(),
});
export type GenerateFunFactInput = z.infer<typeof GenerateFunFactInputSchema>;

const GenerateFunFactOutputSchema = z.object({
  funFact: z.string(),
});
export type GenerateFunFactOutput = z.infer<typeof GenerateFunFactOutputSchema>;

export async function generateFunFact(input: GenerateFunFactInput): Promise<GenerateFunFactOutput> {
  // Minimal tokens
  const promptText = `Compare: {{entity1Name}} ({{entity1Value}} {{entity1Unit}}) vs {{entity2Name}} ({{entity2Value}} {{entity2Unit}}). One fact sentence.`;

  try {
    const {output} = await ai.generate({
      model: 'googleai/gemma-2-9b-it',
      prompt: promptText,
      input,
      output: {schema: GenerateFunFactOutputSchema},
    });
    return output!;
  } catch (e) {
    // Fallback to stable Gemini 1.5 Flash if Gemma/Gemini 2.0 is busy
    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: promptText,
      input,
      output: {schema: GenerateFunFactOutputSchema},
    });
    return output!;
  }
}
