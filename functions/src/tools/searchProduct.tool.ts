import { z } from 'genkit';
import { ai } from '../ai';
import { ResponseSchema } from '../schemas';

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
