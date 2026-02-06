# Getting Started

Embed a powerful AI assistant into any website or web application with just a few lines of code.

## Installation

### Via CDN (Easiest)

Add the following to your HTML body. This is the fastest way to get started using our optimized UMD build.

```html
<script src="https://cdn.jsdelivr.net/npm/omni-chatbot-sdk/dist/omni-chatbot-sdk.umd.js"></script>
<script>
  ChatbotUI.init({
    apiConfig: {
      // Your backend proxy endpoint
      chatEndpoint: "https://your-backend.com/api/chat",
      // Optional headers (e.g. auth)
      headers: { "Authorization": "Bearer TOKEN" } 
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

If you are building a React application, you can install the package directly.

```bash
npm install omni-chatbot-sdk
```

```tsx
import { Chatbot } from 'omni-chatbot-sdk';
import 'omni-chatbot-sdk/dist/style.css';

function App() {
  return (
    <Chatbot 
      apiConfig={{ chatEndpoint: "/api/chat" }} 
      theme="light"
    />
  );
}
```
