import { Locale, CopyStrings } from './types';

/** 默认文案模板 */
export const DEFAULT_COPY: Record<Locale, CopyStrings> = {
  en: {
    greeting: 'Hi there! How can I help you with {name} today?',
    headerTitle: '{name} Support',
    headerSubtitle: 'Always here to help',
    placeholder: 'Ask anything...',
    closeChatLabel: 'Close chat',
    errorMessage: 'Sorry, something went wrong. Please try again later.',
    poweredBy: 'Powered by'
  },
  zh: {
    greeting: '你好！我可以帮您处理 {name} 的问题吗？',
    headerTitle: '{name} 智能客服',
    headerSubtitle: '随时为您服务',
    placeholder: '请输入问题...',
    closeChatLabel: '关闭聊天',
    errorMessage: '抱歉，出错了，请稍后再试。',
    poweredBy: '技术支持'
  }
};
