# Build Your First AI Agent with Genkit

![Firebase Genkit](https://img.shields.io/badge/Firebase-Genkit-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)

Source code for the **Build Your First AI Agent with Genkit** workshop, a hands-on codelab (~90 min) where you'll build a **Smart Retail assistant** capable of reasoning, querying real-time APIs, and applying business rules, using [Firebase Genkit](https://firebase.google.com/docs/genkit) and [Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/), deployed on [Cloud Functions](https://firebase.google.com/docs/functions).

📖 **Follow the full codelab at**: [workshop-genkit-agents-101.lperezp.dev](https://workshop-genkit-agents-101.lperezp.dev/)

## What you'll build

An intelligent shopping assistant that:

- Understands user needs through natural language
- Queries a product catalog in real time
- Automatically validates whether a product meets quality and availability standards
- Responds with structured data ready to be consumed by a web application

## Firebase Genkit Integration

### Core AI Capabilities

This project demonstrates three levels of progressive complexity with **Firebase Genkit**:

#### **Implemented flows**

- **`basicScoutFlow`** _(local only)_: Pure generation without tools — the model responds solely from its internal knowledge
- **`agentFlow`** _(local only)_: Agent with tool calling to the products API; the model decides when to invoke the tool
- **`guardedScoutFlow`** _(local + Firebase)_: Agent with a system rule that adds a `warning` field if the product rating is below 3.0
- **`generateGuardedScoutFlow`** _(Firebase only)_: Wrapper as a Firebase Callable Function (`onCallGenkit`) for consumption from web/mobile clients

#### **Technical Implementation**

- **Tool Calling**: `searchProductTool` queries [dummyjson.com](https://dummyjson.com) as a simulated "GenkitStore" catalog
- **Firebase Secret Manager**: The `GOOGLE_GENAI_API_KEY` is managed as a secret in production
- **Cloud Functions Deployment**: Serverless scaling with automatic HTTPS endpoint
- **CORS Support**: Cross-origin requests for frontend integration


## Project structure

```
workshop-genkit-agents/
├── firebase.json           # Firebase configuration (Functions)
├── package.json            # Local dependencies (genkit, tsx, typescript)
├── tsconfig.json           # Root TypeScript configuration (ESNext, NodeNext)
├── src/
│   └── index.ts            # Local flows: basicScoutFlow, agentFlow, guardedScoutFlow
└── functions/
    ├── package.json        # Functions dependencies (firebase-admin, firebase-functions, genkit)
    ├── tsconfig.json       # TypeScript configuration for Functions
    └── src/
        └── index.ts        # guardedScoutFlow + generateGuardedScoutFlow (Callable)
```

- **`src/`**: local development environment with all flows to experiment with
- **`functions/`**: production environment, exposes only `guardedScoutFlow` as a Callable Function

## Installation

To set up the project, follow these steps:

### Prerequisites

- Node.js (v20 or higher)
- Firebase CLI (`npm install -g firebase-tools`)
- Gemini API Key enabled at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Local environment

```bash
npm install
```

### Firebase Functions

```bash
cd functions
npm install
```

### Environment variables

Create a `.env` file at the root with:

```env
GOOGLE_GENAI_API_KEY=your_api_key_here
```

For production, the API key is managed as a Firebase secret:

```bash
firebase functions:secrets:set GOOGLE_GENAI_API_KEY
```

## Usage

### Run a flow directly

```bash
npx tsx src/index.ts
```

### Firebase Functions (local emulator)

```bash
cd functions
npm run serve
```

### Deploy to production

```bash
firebase deploy --only functions
```

The `predeploy` configured in `firebase.json` runs `tsc` automatically before deployment.

## Genkit Dev UI

Genkit includes a development UI to visually test and debug flows:

### Prerequisites

1. Generate an API Key at [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create the `.env` file at the root with `GOOGLE_GENAI_API_KEY=your_api_key`

### Start the Dev UI

```bash
npx genkit start -- npx tsx src/index.ts
```

Go to `http://localhost:4000`.

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

**Did you find the workshop useful? Give the repository a star ⭐ ⬆️.**
