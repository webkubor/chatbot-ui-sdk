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
      apiKey: "YOUR_API_KEY",
      baseUrl: "https://api.deepseek.com", // Optional
      systemPrompt: "You are a helpful assistant." // Optional
    },
    theme: "auto", // 'auto', 'light', 'dark'
    mode: "floating" // 'floating', 'embedded'
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
      apiConfig={{ apiKey: "..." }} 
      theme="light"
    />
  );
}
```

## Configuration

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `apiConfig` | `ApiConfig` | - | **Required**. API settings for AI communication. |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Visual theme mode. |
| `mode` | `'floating' \| 'embedded'` | `'floating'` | Display mode. |
| `brand` | `BrandConfig` | - | Custom logo, name, and links. |
| `colors` | `ThemeColors` | - | Custom accent colors. |
| `copy` | `CopyOverrides` | - | Custom text strings for localization. |

## License

MIT © [webkubor](https://github.com/webkubor)