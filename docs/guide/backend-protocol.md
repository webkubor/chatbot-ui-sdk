# 后端协议规范 (Backend Protocol)

为了确保安全性与灵活性，Chatbot UI SDK 设计为**与您的业务后端（Proxy）通信**，而不是直接在前端请求 LLM 提供商。

::: warning 安全第一
切勿在前端代码中直接暴露您的 LLM API Key（如 OpenAI、DeepSeek 的 Key）。请务必通过后端代理转发。
:::

## 协议详解

您的后端接口（例如 `/api/ai-customer-service/chat`）需要遵循以下标准 JSON 契约。

### 请求格式 (Request)

SDK 会向您的接口发送一个 `POST` 请求，Body 内容如下：

```json
{
  "message": "用户当前的输入内容",
  "history": [
    { "role": "assistant", "content": "你好！有什么我可以帮你的吗？" },
    { "role": "user", "content": "我想咨询关于..." }
  ],
  "config": {
    // 任何您在 apiConfig.extraBody 中配置的额外参数
  }
}
```

### 响应格式 (Response)

您的服务器应返回 JSON 响应。我们推荐使用 **方案 A**，但也兼容更简单的方案 B。

#### 方案 A：标准结构 (推荐)

```json
{
  "success": true,
  "data": {
    "reply": "AI 返回的回复文本...",
    // 可选元数据
    "model": "deepseek-chat",
    "usage": { "total_tokens": 100 }
  }
}
```

#### 方案 B：精简结构

```json
{
  "reply": "AI 返回的回复文本..."
}
```

## Node.js 实现示例

```javascript
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  
  // 在这里调用 LLM (例如 DeepSeek, OpenAI)
  // 可以在此处注入 system prompt (人设)
  const aiResponse = await callLLM(message, history);

  res.json({
    success: true,
    data: {
      reply: aiResponse
    }
  });
});
```
