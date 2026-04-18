import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

const ai = genkit({
    plugins: [googleAI()],
    model: googleAI.model('gemini-2.5-flash'),
});

export const basicScoutFlow = ai.defineFlow(
    {
        name: 'basicScoutFlow',
    },
    async (productType) => {
        const { text } = await ai.generate(
            `Eres un experto en retail. Dame los detalles de este producto: ${productType}`
        );
        return text;
    }
);