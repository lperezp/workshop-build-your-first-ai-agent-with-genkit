import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

const ai = genkit({
    plugins: [googleAI()],
    model: googleAI.model('gemini-2.5-flash'),
});

const ProductReviewSchema = z.object({
    name: z.string(),
    brand: z.string(),
    features: z.array(z.string()),
    recommendation_text: z.string()
});

export const basicScoutFlow = ai.defineFlow(
    {
        name: 'basicScoutFlow',
        inputSchema: z.string(),
        outputSchema: ProductReviewSchema,
    },
    async (productName) => {
        const { output } = await ai.generate({
            prompt: `Eres un experto en retail. Dame los detalles de este producto: ${productName}`,
            output: { schema: ProductReviewSchema },
        });

        if (!output) throw new Error("La IA no pudo generar el formato correcto.");
        return output;
    }
);