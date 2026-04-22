# Build Your First AI Agent with Genkit

![Firebase Genkit](https://img.shields.io/badge/Firebase-Genkit-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)

Código fuente del workshop **Build Your First AI Agent with Genkit**, un codelab práctico (~90 min) donde construirás un **Smart Retail assistant** capaz de razonar, consultar APIs en tiempo real y aplicar reglas de negocio, usando [Firebase Genkit](https://firebase.google.com/docs/genkit) y [Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/), desplegado en [Cloud Functions](https://firebase.google.com/docs/functions).

📖 **Sigue el codelab completo en**: [workshop-genkit-agents-101.lperezp.dev](https://workshop-genkit-agents-101.lperezp.dev/)

## Qué construirás

Un asistente inteligente de compras que:

- Entiende las necesidades del usuario mediante lenguaje natural
- Consulta en tiempo real un catálogo de productos
- Valida automáticamente si un producto cumple con estándares de calidad y disponibilidad
- Responde con datos estructurados listos para ser consumidos por una aplicación web

## Firebase Genkit Integration

### Core AI Capabilities

Este proyecto demuestra tres niveles de complejidad progresiva con **Firebase Genkit**:

#### **Flujos implementados**

- **`basicScoutFlow`** _(solo local)_: Generación pura sin herramientas — el modelo responde únicamente con su conocimiento interno
- **`agentFlow`** _(solo local)_: Agente con tool calling hacia la API de productos; el modelo decide cuándo invocar la herramienta
- **`guardedScoutFlow`** _(local + Firebase)_: Agente con regla de sistema que añade un campo `warning` si el rating del producto es menor a 3.0
- **`generateGuardedScoutFlow`** _(solo Firebase)_: Wrapper como Firebase Callable Function (`onCallGenkit`) para consumo desde clientes web/móvil

#### **Technical Implementation**

- **Tool Calling**: `searchProductTool` consulta [dummyjson.com](https://dummyjson.com) como catálogo simulado de "GenkitStore"
- **Firebase Secret Manager**: La `GOOGLE_GENAI_API_KEY` se gestiona como secreto en producción
- **Cloud Functions Deployment**: Escalado serverless con endpoint HTTPS automático
- **CORS Support**: Requests cross-origin para integración con frontend


## Estructura del proyecto

```
workshop-genkit-agents/
├── firebase.json           # Configuración de Firebase (Functions)
├── package.json            # Dependencias locales (genkit, tsx, typescript)
├── tsconfig.json           # Configuración TypeScript raíz (ESNext, NodeNext)
├── src/
│   └── index.ts            # Flujos locales: basicScoutFlow, agentFlow, guardedScoutFlow
└── functions/
    ├── package.json        # Dependencias Functions (firebase-admin, firebase-functions, genkit)
    ├── tsconfig.json       # Configuración TypeScript para Functions
    └── src/
        └── index.ts        # guardedScoutFlow + generateGuardedScoutFlow (Callable)
```

- **`src/`**: entorno de desarrollo local con todos los flujos para experimentar
- **`functions/`**: entorno de producción, expone solo `guardedScoutFlow` como Callable Function

## Instalación

Para configurar el proyecto, sigue estos pasos:

### Prerequisitos

- Node.js (v20 o superior)
- Firebase CLI (`npm install -g firebase-tools`)
- API Key de Gemini habilitada en [Google AI Studio](https://aistudio.google.com/app/apikey)

### Entorno local

```bash
npm install
```

### Firebase Functions

```bash
cd functions
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
GOOGLE_GENAI_API_KEY=tu_api_key_aqui
```

Para producción, la API key se gestiona como secreto de Firebase:

```bash
firebase functions:secrets:set GOOGLE_GENAI_API_KEY
```

## Uso

### Ejecutar un flujo directamente

```bash
npx tsx src/index.ts
```

### Firebase Functions (emulador local)

```bash
cd functions
npm run serve
```

### Despliegue a producción

```bash
firebase deploy --only functions
```

El `predeploy` configurado en `firebase.json` ejecuta `tsc` automáticamente antes del despliegue.

## Genkit Dev UI

Genkit incluye una interfaz de desarrollo para probar y depurar los flujos visualmente:

### Prerequisitos

1. Genera una API Key en [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crea el archivo `.env` en la raíz con `GOOGLE_GENAI_API_KEY=tu_api_key`

### Iniciar la Dev UI

```bash
npx genkit start -- npx tsx src/index.ts
```

Accede a `http://localhost:4000`.

## Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/lperezp/workshop-genkit-agents/pulls)

All contributions are welcome! You can submit any ideas as [pull requests](https://github.com/lperezp/workshop-genkit-agents/pulls) or as [GitHub issues](https://github.com/lperezp/workshop-genkit-agents/issues).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [Apache License 2.0](LICENSE). You can use, modify, and distribute this code following the terms of the license.

## Author

- [Luis Eduardo](https://lperezp.dev/?utm_source=workshop-genkit-agents&utm_medium=readme&utm_campaign=workshop-genkit-agents&utm_id=github)

**¿Te fue útil el workshop? Dale una estrella al repositorio ⭐ ⬆️.**
