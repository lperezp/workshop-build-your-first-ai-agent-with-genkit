import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

const ai = genkit({
    plugins: [googleAI()],
    model: googleAI.model('gemini-2.5-flash'),
});

const ProductDetailsSchema = z.array(z.object({
    name: z.string(),
    brand: z.string(),
    features: z.array(z.string()),
    recommendation_text: z.string()
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

export const searchProductTool = ai.defineTool(
    {
        name: 'searchProduct',
        description: 'Busca productos en el catálogo oficial de la tienda GenkitStore para obtener precios y stock en tiempo real.',
        inputSchema: z.object({ query: z.string() }),
        outputSchema: z.any(),
    },
    async (input) => {
        const response = await fetch(`https://dummyjson.com/products/search?q=${input.query}`);
        const data = await response.json();
        return data.products;
    }
);

export const agentFlow = ai.defineFlow(
    {
        name: 'agentFlow',
        inputSchema: z.string(),
        outputSchema: ProductDetailsSchema,
    },
    async (userInput) => {
        const { output } = await ai.generate({
            prompt: userInput,
            tools: [searchProductTool],
            output: { schema: ProductDetailsSchema },
        });

        if (!output) throw new Error("La IA no pudo generar el formato correcto.");
        return output;
    }
);