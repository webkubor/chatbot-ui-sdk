export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ApiConfig {
  /** API 密钥 */
  apiKey: string;
  /** API 地址，例如 https://api.deepseek.com/v1 */
  baseUrl?: string;
  /** 模型名称 */
  model?: string;
  /** 系统提示词 */
  systemPrompt?: string;
}

/**
 * 发送消息到 AI 服务
 * @param messages 消息历史
 * @param config API 配置参数
 */
export async function sendMessageToAI(
  messages: ChatMessage[], 
  config: ApiConfig
): Promise<string> {
  const { 
    apiKey, 
    baseUrl = 'https://api.deepseek.com', 
    model = 'deepseek-chat',
    systemPrompt = "You are a helpful customer support AI."
  } = config;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error('Error calling AI Service:', error);
    throw error;
  }
}