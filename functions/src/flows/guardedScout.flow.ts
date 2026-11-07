import { z } from 'genkit';
import { ai } from '../ai';
import { ProductDetailsSchema } from '../schemas';
import { searchProductTool } from '../tools';

export const guardedScoutFlow = ai.defineFlow(
    {
        name: 'guardedScoutFlow',
        inputSchema: z.string(),
        outputSchema: ProductDetailsSchema,
    },
    async (userInput) => {
        const { output } = await ai.generate({
            prompt: userInput,
            tools: [searchProductTool],
            output: { schema: ProductDetailsSchema },
            system: `
                Eres un asistente de compras honesto. 
                REGLA DE ORO: Si un producto tiene un rating menor a 3.0, 
                debes llenar el campo 'warning' indicando que la satisfacción 
                del cliente es baja.
            `,
        });

        if (!output) throw new Error("Error al generar respuesta");
        return output;
    }
);
