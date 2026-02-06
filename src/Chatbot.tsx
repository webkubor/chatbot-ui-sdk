import React from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from './lib/utils';
import { ChatbotProps } from './types';
import { useChatbot } from './hooks/useChatbot';
import './styles.css';

export const Chatbot: React.FC<ChatbotProps> = (props) => {
  const { mode = 'floating', brand, colors } = props;
  const {
    isOpen,
    isDarkMode,
    copyText,
    messages,
    inputValue,
    setInputValue,
    toggleChat,
    handleSubmit
  } = useChatbot(props);

  const renderChatWindow = () => (
    <div
      className={cn(
        "pl-flex pl-flex-col pl-overflow-hidden pl-float-animate pl-app-bg pl-shadow-premium",
        isDarkMode ? "pl-dark-mode" : "",
        mode === 'floating'
          ? "pl-fixed pl-bottom-24 pl-right-6 pl-w-[380px] pl-h-[600px] pl-max-h-[calc(100vh-120px)] pl-rounded-3xl pl-z-50"
          : "pl-h-full pl-w-full pl-rounded-2xl"
      )}
      style={{
        '--pl-accent-color': colors?.accent || (isDarkMode ? '#60a5fa' : '#104EFF'),
      } as any}
    >
      {/* Header */}
      <div className={cn(
        "pl-p-5 pl-flex pl-justify-between pl-items-center pl-header-bg"
      )}>
        <div className="pl-flex pl-items-center pl-gap-3.5">
          <div className="pl-w-10 pl-h-10 pl-rounded-full pl-flex pl-items-center pl-justify-center pl-bg-white/10 pl-backdrop-blur-sm">
            {brand?.logoUrl ? <img src={brand.logoUrl} className="pl-w-6 pl-h-6 pl-object-contain" alt="logo" /> : <MessageCircle className="pl-w-6 pl-h-6" />}
          </div>
          <div>
            <h3 className="pl-font-bold pl-text-sm">{copyText.headerTitle}</h3>
            <p className="pl-text-[10px] pl-uppercase pl-tracking-widest pl-opacity-70">{copyText.headerSubtitle}</p>
          </div>
        </div>
        {mode === 'floating' && <button onClick={toggleChat} className="pl-p-2 hover:pl-bg-white/10 pl-rounded-full pl-transition-colors"><X size={20} /></button>}
      </div>

      {/* Content */}
      <div className="pl-flex-1 pl-p-5 pl-overflow-y-auto pl-space-y-5 pl-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={cn("pl-flex pl-message-animate", msg.role === 'user' ? "pl-justify-end" : "pl-justify-start")}>
            <div className={cn(
              "pl-max-w-[85%] pl-rounded-2xl pl-px-4 pl-py-3 pl-text-sm shadow-sm pl-markdown-content",
              msg.role === 'user' ? "pl-text-white" : "cb-bubble-bot"
            )} style={msg.role === 'user' ? { backgroundColor: colors?.accent || 'var(--pl-accent-color)' } : {}}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {/* Placeholder for typing indicator if needed later */}
      </div>

      {/* Footer */}
      <div className="pl-p-5 pl-input-area">
        <form onSubmit={handleSubmit} className="pl-rgb-border pl-rounded-full">
          <div className="pl-rounded-full pl-flex pl-items-center pl-p-1.5 pl-bg-[rgb(var(--pl-bg-input))] pl-transition-colors">
            <input
              className="pl-flex-1 pl-bg-transparent pl-px-4 pl-py-2 pl-text-sm pl-outline-none placeholder:pl-text-slate-400"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={copyText.placeholder}
            />
            <button type="submit" className="pl-p-2.5 pl-rounded-full pl-text-white shadow-md pl-transition-transform hover:pl-scale-105 active:pl-scale-95" style={{ backgroundColor: 'var(--pl-accent-color)' }}>
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {mode === 'floating' && (
        <button onClick={toggleChat} className="pl-fixed pl-bottom-6 pl-right-6 pl-h-16 pl-w-16 pl-rounded-full pl-shadow-2xl pl-flex pl-items-center pl-justify-center pl-z-50 pl-bg-blue-600 pl-text-white">
          {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
        </button>
      )}
      {isOpen && renderChatWindow()}
    </>
  );
};
