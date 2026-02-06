# 快速开始

只需几行代码，即可将强大的 AI 助手嵌入到您的网站或 Web 应用中。

## 安装方式

### 方式一：CDN 引入 (推荐)

这是最快的使用方式。将以下代码添加到您的 HTML `body` 标签中：

```html
<script src="https://cdn.jsdelivr.net/npm/omni-chatbot-sdk/dist/omni-chatbot-sdk.umd.js"></script>
<script>
  ChatbotUI.init({
    apiConfig: {
      // 您的后端代理接口地址
      chatEndpoint: "https://your-backend.com/api/chat",
      // 可选：自定义请求头（例如鉴权 Token）
      headers: { "Authorization": "Bearer TOKEN" } 
    },
    // 主题设置：支持 'auto' (自动), 'light' (浅色), 'dark' (深色)
    theme: "auto", 
    brand: {
      name: "我的 AI 助手",
      logoUrl: "https://example.com/logo.png"
    }
  });
</script>
```

### 方式二：NPM 包安装

如果您正在开发 React 应用，推荐使用 NPM 包进行更紧密的集成。

```bash
npm install omni-chatbot-sdk
```

```tsx
import { Chatbot } from 'omni-chatbot-sdk';
// 引入样式文件
import 'omni-chatbot-sdk/dist/style.css';

function App() {
  return (
    <Chatbot 
      // 指向您的业务后端
      apiConfig={{ chatEndpoint: "/api/chat" }} 
      theme="light"
    />
  );
}
```
