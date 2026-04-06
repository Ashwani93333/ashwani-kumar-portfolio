'use server';
/**
 * @fileOverview An AI agent that generates descriptions for projects or summaries for blog posts.
 *
 * - generateContentDescription - A function that handles the content generation process.
 * - GenerateContentDescriptionInput - The input type for the generateContentDescription function.
 * - GenerateContentDescriptionOutput - The return type for the generateContentDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentDescriptionInputSchema = z.object({
  contentType: z
    .enum(['project', 'blog'])
    .describe('The type of content to generate (project description or blog summary).'),
  input: z
    .string()
    .describe(
      'Keywords, a brief input, or a title to guide the content generation. e.g. "Online store for handcrafted jewelry, React, Firebase, Stripe" or "My thoughts on AI in modern web development"'
    ),
});
export type GenerateContentDescriptionInput = z.infer<typeof GenerateContentDescriptionInputSchema>;

const GenerateContentDescriptionOutputSchema = z.object({
  content: z.string().describe('The generated project description or blog post summary.'),
});
export type GenerateContentDescriptionOutput = z.infer<typeof GenerateContentDescriptionOutputSchema>;

export async function generateContentDescription(
  input: GenerateContentDescriptionInput
): Promise<GenerateContentDescriptionOutput> {
  return generateContentDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentDescriptionPrompt',
  input: {schema: GenerateContentDescriptionInputSchema},
  output: {schema: GenerateContentDescriptionOutputSchema},
  prompt: `You are an expert content writer for an online portfolio.

{{#if (eq contentType "project")}}
  Your task is to create a compelling project description for a portfolio showcase.
  Focus on key features, technologies used, and the problem it solves or value it provides.
  The description should be engaging and concise.
  Keywords/Brief Input: "{{{input}}}"
{{else if (eq contentType "blog")}}
  Your task is to create a concise and engaging summary for a blog post.
  Highlight the main topic and what the reader can expect to learn.
  Blog Post Title/Brief Input: "{{{input}}}"
{{/if}}

Please provide only the generated content, without any introductory or concluding remarks.`,
});

const generateContentDescriptionFlow = ai.defineFlow(
  {
    name: 'generateContentDescriptionFlow',
    inputSchema: GenerateContentDescriptionInputSchema,
    outputSchema: GenerateContentDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
