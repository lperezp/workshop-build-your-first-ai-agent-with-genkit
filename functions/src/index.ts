import { onCallGenkit } from 'firebase-functions/https';
import { googleAIapiKey } from './ai';
import { guardedScoutFlow } from './flows';

export * from './ai';
export * from './schemas';
export * from './tools';
export * from './flows';

export const generateGuardedScoutFlow = onCallGenkit(
    {
        cors: '*',
        authPolicy: () => true,
        secrets: [googleAIapiKey],
    },
    guardedScoutFlow
);
