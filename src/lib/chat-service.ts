import { ApiConfig } from '../types';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * 发送消息到业务后端
 * 遵循标准格式: POST { message: string, history: [] }
 */
export async function sendMessageToAI(
  messages: ChatMessage[],
  config: ApiConfig
): Promise<string> {
  const { chatEndpoint, headers = {}, extraBody = {} } = config;

  if (!chatEndpoint) {
    throw new Error("Chat Endpoint is not configured.");
  }

  try {
    // 1. 拆分当前问题和历史记录
    const lastMsg = messages[messages.length - 1];
    const history = messages.slice(0, -1);

    const userMessage = lastMsg.role === 'user' ? lastMsg.content : "";
    if (!userMessage) {
      throw new Error("No user message found to send.");
    }

    // 2. 构造请求体
    const payload = {
      message: userMessage,
      history: history,
      ...extraBody
    };

    // 3. 发起请求
    const response = await fetch(chatEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Backend request failed (${response.status}): ${errText.substring(0, 100)}...`);
    }

    // 4. 解析标准响应结构
    const result = await response.json();

    // 兼容 { success: true, data: { reply: "..." } } 格式
    if (result && result.data && result.data.reply) {
      return result.data.reply;
    }

    // 兼容简单的 { reply: "..." } 或 { message: "..." }
    if (result.reply) return result.reply;
    if (result.message) return result.message;

    console.warn("Unexpected response format:", result);
    return "Received an empty response from server.";

  } catch (error) {
    console.error('Chat Service Error:', error);
    throw error;
  }
}