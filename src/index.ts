import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

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

const ResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    discountPercentage: z.number(),
    rating: z.number(),
    stock: z.number(),
    tags: z.array(z.string()),
    brand: z.string(),
    sku: z.string(),
    weight: z.number(),
    dimensions: z.object({
        width: z.number(),
        height: z.number(),
        depth: z.number(),
    }),
    warrantyInformation: z.string(),
    shippingInformation: z.string(),
    availabilityStatus: z.string(),
    reviews: z.array(
        z.object({
            rating: z.number(),
            comment: z.string(),
            date: z.string(),
            reviewerName: z.string(),
            reviewerEmail: z.string(),
        })
    ),
    returnPolicy: z.string(),
    minimumOrderQuantity: z.number(),
    meta: z.object({
        createdAt: z.string(),
        updatedAt: z.string(),
        barcode: z.string(),
        qrCode: z.string(),
    }),
    images: z.array(z.string()),
    thumbnail: z.string(),
})

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
        outputSchema: z.array(ResponseSchema),
    },
    async (input) => {
        const response = await fetch(`https://dummyjson.com/products/search?q=${input.query}`);
        const data = await response.json();

        // Regla de precios: Filtramos productos que superen el presupuesto máximo
        const affordableProducts = data.products.filter((p: any) => p.price <= 1900);
        return affordableProducts;
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