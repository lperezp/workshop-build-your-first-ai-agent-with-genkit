import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';
import { defineSecret } from 'firebase-functions/params';

// enableFirebaseTelemetry();

export const googleAIapiKey = defineSecret('GOOGLE_GENAI_API_KEY');

export const ai = genkit({
    plugins: [googleAI()],
    model: googleAI.model('gemini-2.5-flash'),
});
