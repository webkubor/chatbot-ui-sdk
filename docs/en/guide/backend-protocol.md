# Backend API Protocol

To ensure security and flexibility, Chatbot UI SDK is designed to communicate with your backend (Proxy), rather than directly with LLM providers.

::: info Security First
Never expose your LLM API Keys (OpenAI, DeepSeek, etc.) in your frontend code. Always use a backend proxy.
:::

## Protocol Specification

Your backend endpoint (e.g., `/api/ai-customer-service/chat`) must adhere to the following JSON contract.

### Request Format

The SDK sends a `POST` request with the following JSON body:

```json
{
  "message": "User's current input text",
  "history": [
    { "role": "assistant", "content": "Hello! How can I help?" },
    { "role": "user", "content": "I need help with..." }
  ],
  "config": {
    // Any extra keys you passed in apiConfig.extraBody
  }
}
```

### Response Format

Your server should return a JSON response. We recommend **Option A**, but Option B is supported for simpler implementations.

#### Option A: Standard (Recommended)

```json
{
  "success": true,
  "data": {
    "reply": "The AI's response text here...",
    // Optional metadata
    "model": "deepseek-chat",
    "usage": { "total_tokens": 100 }
  }
}
```

#### Option B: Simple

```json
{
  "reply": "The AI's response text here..."
}
```

## Example Implementation (Node.js)

```javascript
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  
  // Call your LLM here (e.g., DeepSeek, OpenAI)
  const aiResponse = await callLLM(message, history);

  res.json({
    success: true,
    data: {
      reply: aiResponse
    }
  });
});
```
