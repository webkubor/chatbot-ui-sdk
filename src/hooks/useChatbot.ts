import { useState, useEffect } from 'react';
import { ChatbotProps, ChatMessage, Locale, CopyStrings } from '../types';
import { DEFAULT_COPY } from '../constants';
import { sendMessageToAI } from '../lib/chat-service';

export const useChatbot = (props: ChatbotProps) => {
  const { appId, apiConfig, theme = 'auto', locale = 'auto', brand, copy } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [resolvedLocale] = useState<Locale>(() => {
    if (locale !== 'auto') return locale;
    if (typeof navigator === 'undefined') return 'en';
    const lang = (navigator.language || 'en').toLowerCase();
    return lang.startsWith('zh') ? 'zh' : 'en';
  });

  // 文案处理逻辑
  const defaultBrandName = resolvedLocale === 'zh' ? '智能助手' : 'AI Assistant';
  const brandName = brand?.name || defaultBrandName;
  
  const baseCopyTemplate = DEFAULT_COPY[resolvedLocale];
  const processedBaseCopy = {} as CopyStrings;
  (Object.keys(baseCopyTemplate) as Array<keyof CopyStrings>).forEach(key => {
    processedBaseCopy[key] = baseCopyTemplate[key].replace(/{name}/g, brandName);
  });

  const copyText: CopyStrings = {
    ...processedBaseCopy,
    ...(copy?.[resolvedLocale] ?? {}),
    ...(brand?.headerTitle ? { headerTitle: brand.headerTitle } : {}),
    ...(brand?.headerSubtitle ? { headerSubtitle: brand.headerSubtitle } : {}),
    ...(brand?.greeting ? { greeting: brand.greeting } : {}),
    ...(brand?.poweredByText ? { poweredBy: brand.poweredByText } : {})
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { role: 'assistant', content: copyText.greeting }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    console.log(`Chatbot initialized with appId: ${appId}`);
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [appId, theme]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const reply = await sendMessageToAI([...messages, { role: 'user', content: userMsg }], apiConfig);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: copyText.errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    isOpen,
    isDarkMode,
    resolvedLocale,
    copyText,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    toggleChat,
    handleSubmit
  };
};
