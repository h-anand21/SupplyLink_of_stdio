'use server';

/**
 * @fileOverview Summarizes product reviews to identify key aspects and sentiment.
 *
 * - summarizeProductReviews - A function that summarizes product reviews.
 * - SummarizeProductReviewsInput - The input type for the summarizeProductReviews function.
 * - SummarizeProductReviewsOutput - The return type for the summarizeProductReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProductReviewsInputSchema = z.object({
  productReviews: z
    .string()
    .describe('A string containing multiple product reviews.'),
  productName: z.string().describe('The name of the product being reviewed.'),
});
export type SummarizeProductReviewsInput = z.infer<
  typeof SummarizeProductReviewsInputSchema
>;

const SummarizeProductReviewsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the product reviews, highlighting key aspects such as quality, cost, and sentiment.'
    ),
});
export type SummarizeProductReviewsOutput = z.infer<
  typeof SummarizeProductReviewsOutputSchema
>;

export async function summarizeProductReviews(
  input: SummarizeProductReviewsInput
): Promise<SummarizeProductReviewsOutput> {
  return summarizeProductReviewsFlow(input);
}

const summarizeProductReviewsPrompt = ai.definePrompt({
  name: 'summarizeProductReviewsPrompt',
  input: {schema: SummarizeProductReviewsInputSchema},
  output: {schema: SummarizeProductReviewsOutputSchema},
  prompt: `You are an AI assistant helping vendors understand customer reviews for their products.
  Given a product named "{{productName}}" and a series of customer reviews:
  """
  {{productReviews}}
  """
  Summarize the reviews, identifying key aspects such as quality, cost, and overall sentiment.
  The summary should be concise and easy to understand, helping vendors quickly assess the product's strengths and weaknesses.
  Focus on aspects that customers feel strongly about whether it's cost, the quality or some other dimension.
  Give a single paragraph summary.`,
});

const summarizeProductReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeProductReviewsFlow',
    inputSchema: SummarizeProductReviewsInputSchema,
    outputSchema: SummarizeProductReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeProductReviewsPrompt(input);
    return output!;
  }
);
