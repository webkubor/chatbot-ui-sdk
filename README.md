# Chatbot UI SDK

A universal, lightweight, and highly customizable chatbot frontend UI SDK.
Embed a powerful AI assistant into any website or web application with just a few lines of code.

![License](https://img.shields.io/npm/l/chatbot-ui-sdk?style=flat-square)
![Version](https://img.shields.io/npm/v/chatbot-ui-sdk?style=flat-square)

## Features

- 🤖 **AI-Agnostic**: Compatible with any OpenAI-compatible API (DeepSeek, OpenAI, Groq, etc.).
- 🎨 **Fully Customizable**: Adjust colors, themes, logos, and branding to match your site.
- 🌍 **Multilingual**: Built-in support for English and Chinese, with easy localization overrides.
- 🚀 **Zero Dependencies (CDN)**: Optimized UMD build that works everywhere.
- 🌓 **Auto Dark Mode**: Responds to system preferences or can be fixed to a specific theme.
- 📝 **Markdown Ready**: High-quality rendering for text, lists, and code blocks.

## Installation

### Via CDN (Easiest)

Add the following to your HTML body:

```html
<script src="https://cdn.jsdelivr.net/npm/chatbot-ui-sdk/dist/chatbot-ui-sdk.umd.js"></script>
<script>
  ChatbotUI.init({
    apiConfig: {
      chatEndpoint: "https://your-backend.com/api/chat", // Your backend proxy endpoint
      headers: { "Authorization": "Bearer TOKEN" } // Optional custom headers
    },
    theme: "auto", 
    brand: {
      name: "My AI Assistant",
      logoUrl: "https://example.com/logo.png"
    }
  });
</script>
```

### Via NPM

```bash
npm install chatbot-ui-sdk
```

```tsx
import { Chatbot } from 'chatbot-ui-sdk';
import 'chatbot-ui-sdk/dist/style.css';

function App() {
  return (
    <Chatbot 
      apiConfig={{ chatEndpoint: "/api/ai-customer-service/chat" }} 
      theme="light"
    />
  );
}
```

## Backend Integration Guide

To ensure security, this SDK is designed to communicate with your backend, not directly with LLM providers.

### Expected API Contract

Your backend endpoint (e.g., `/api/ai-customer-service/chat`) must accept a POST request with the following body:

```json
{
  "message": "User's current input text",
  "history": [
    { "role": "assistant", "content": "Hello..." },
    { "role": "user", "content": "Previous question..." }
  ]
}
```

And return a JSON response in one of the following formats:

**Option A (Recommended):**

```json
{
  "success": true,
  "data": {
    "reply": "The AI's response text here..."
  }
}
```

**Option B (Simple):**

```json
{
  "reply": "The AI's response text here..."
}
```

## Configuration

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `apiConfig` | `ApiConfig` | - | **Required**. Backend connection settings. |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Visual theme mode. |
| `mode` | `'floating' \| 'embedded'` | `'floating'` | Display mode. |
| `brand` | `BrandConfig` | - | Custom logo, name, and links. |
| `colors` | `ThemeColors` | - | Custom accent colors. |
| `copy` | `CopyOverrides` | - | Custom text strings for localization. |

### ApiConfig Type

```typescript
interface ApiConfig {
  /** The full URL of your backend chat endpoint */
  chatEndpoint: string;
  /** Optional custom headers (e.g. for authentication) */
  headers?: Record<string, string>;
  /** Optional extra body parameters to send with every request */
  extraBody?: Record<string, any>;
}
```

## License

MIT © [webkubor](https://github.com/webkubor)
