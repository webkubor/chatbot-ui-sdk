<div align="center">
  <a href="https://github.com/webkubor/chatbot-ui-sdk">
    <img src="./docs/public/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Chatbot UI SDK</h1>

  <p align="center">
    <strong>Universal AI Frontend Widget & SDK</strong>
    <br />
    The missing UI layer for your custom AI Agents.
  </p>

  <p align="center">
    <a href="https://webkubor.github.io/chatbot-ui-sdk/"><strong>📚 Documentation</strong></a> ·
    <a href="https://chatbot-ui-sdk-wine.vercel.app/"><strong>🌐 Official Site & Demo</strong></a> ·
    <a href="https://github.com/webkubor/chatbot-ui-sdk/issues"><strong>🐛 Report Bug</strong></a>
  </p>
  
  <p align="center">
    <!-- Version -->
    <a href="https://www.npmjs.com/package/chatbot-ui-sdk">
        <img src="https://img.shields.io/npm/v/chatbot-ui-sdk?style=flat-square&color=blue" alt="npm version" />
    </a>
    <!-- License -->
    <a href="./LICENSE">
        <img src="https://img.shields.io/npm/l/chatbot-ui-sdk?style=flat-square&color=blue" alt="license" />
    </a>
    <!-- Bundle Size -->
    <a href="https://bundlephobia.com/result?p=chatbot-ui-sdk">
        <img src="https://img.shields.io/bundlephobia/minzip/chatbot-ui-sdk?style=flat-square&color=success" alt="bundle size" />
    </a>
    <!-- Docs Build -->
    <a href="https://github.com/webkubor/chatbot-ui-sdk/actions/workflows/deploy-docs.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/webkubor/chatbot-ui-sdk/deploy-docs.yml?label=docs&style=flat-square" alt="docs build" />
    </a>
  </p>
</div>

<br />

## ⚡️ Introduction

**Chatbot UI SDK** is a professional, framework-agnostic frontend widget designed to add an AI chat interface to any website in seconds.

Unlike other chat widgets that lock you into specific providers, this SDK is **backend-agnostic**. You provide the API endpoint, and we handle the beautiful UI, state management, Markdown rendering, and animations.

## ✨ Features

- **🎨 Ultra-Premium UI**: Glassmorphism design, fluid mesh gradients, and spring-physics animations.
- **🔌 Backend Agnostic**: Works with **DeepSeek**, **OpenAI**, **Claude**, or any custom LLM backend.
- **🌙 Themeable**: Built-in Light/Dark modes with automatic system detection.
- **🌍 I18n Ready**: Native support for English (EN) and Chinese (ZH), with override capabilities.
- **⚛️ Framework Ready**: Optimized for both vanilla HTML/JS (UMD) and React applications.
- **🛡 Security First**: Designed effectively to hide API keys by enforcing a proxy pattern.

## 🚀 Quick Start

### 1. The Easy Way (CDN)

Just drop this into your HTML. No build tools required.

```html
<script src="https://cdn.jsdelivr.net/npm/chatbot-ui-sdk/dist/chatbot-ui-sdk.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chatbot-ui-sdk/dist/style.css">

<script>
  ChatbotUI.init({
    apiConfig: {
      // Point this to your backend proxy (Next.js API, Node, Python, etc.)
      chatEndpoint: "https://your-api.com/chat"
    },
    brand: {
      name: "My AI Assistant",
      logoUrl: "https://your-site.com/logo.png"
    }
  });
</script>
```

### 2. The Pro Way (NPM + React)

```bash
npm install chatbot-ui-sdk
```

```tsx
import { Chatbot } from 'chatbot-ui-sdk';
import 'chatbot-ui-sdk/dist/style.css';

export default function App() {
  return (
      <Chatbot 
        apiConfig={{ chatEndpoint: "/api/chat" }}
        theme="auto" 
      />
  );
}
```

## 🔌 Backend Protocol

This SDK **does not** communicate directly with OpenAI/DeepSeek to prevent leaking your API keys. Instead, it expects your backend to handle the proxying.

**Request (POST):**

```json
{
  "message": "User input",
  "history": [{"role": "user", "content": "..."}]
}
```

**Response:**

```json
{
  "success": true,
  "data": { "reply": "AI response content..." }
}
```

👉 [Read the full Integration Guide](https://webkubor.github.io/chatbot-ui-sdk/guide/backend-protocol.html)

## 🛠 Development

This project is a monorepo containing the SDK source and a documentation site.

```bash
# Install dependencies
pnpm install

# Start SDK development server (Demo Page)
pnpm dev

# Start Documentation server (VitePress)
pnpm docs:dev
```

## 📄 License

MIT © [webkubor](https://github.com/webkubor)
