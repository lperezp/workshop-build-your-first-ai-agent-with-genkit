import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';
import { defineSecret } from "firebase-functions/params";
import { onCallGenkit } from "firebase-functions/https";

// enableFirebaseTelemetry();

const googleAIapiKey = defineSecret("GOOGLE_GENAI_API_KEY");

const ai = genkit({
    plugins: [googleAI()],
    model: googleAI.model('gemini-2.5-flash'),
});

const ProductDetailsSchema = z.array(z.object({
    name: z.string(),
    brand: z.string(),
    price: z.number(),
    rating: z.number(),
    features: z.array(z.string()),
    recommendation_text: z.string(),
    warning: z.string().optional(),
    availability: z.enum(['En Stock', 'Pocas Unidades', 'Agotado']).optional()
}));

export const basicScoutFlow = ai.defineFlow(
    {
        name: 'basicScoutFlow',
        inputSchema: z.string(),
        outputSchema: ProductDetailsSchema,
    },
    async (productName) => {
        const { output } = await ai.generate({
            prompt: `Eres un experto en retail. Dame los detalles de este producto: ${productName}`,
            output: { schema: ProductDetailsSchema },
        });

        if (!output) throw new Error("La IA no pudo generar el formato correcto.");
        return output;
    }
);

export const generateBasicScoutFlow = onCallGenkit(
    {
        cors: '*',
        authPolicy: () => true,
        secrets: [googleAIapiKey],
    },
    basicScoutFlow
);
