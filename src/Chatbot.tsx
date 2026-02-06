import React from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
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
    handleSubmit,
    isTyping
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
      {/* Ambient Mesh Background */}
      <div className="pl-mesh-bg" />

      {/* Header */}
      <div className={cn(
        "pl-p-5 pl-flex pl-justify-between pl-items-center pl-header-bg pl-relative pl-z-10"
      )}>
        <div className="pl-flex pl-items-center pl-gap-3.5">
          <div className="pl-w-10 pl-h-10 pl-rounded-full pl-flex pl-items-center pl-justify-center pl-bg-white/10 pl-backdrop-blur-sm pl-glow-effect pl-status-ring pl-relative">
            {brand?.logoUrl ? <img src={brand.logoUrl} className="pl-w-6 pl-h-6 pl-object-contain pl-relative pl-z-10" alt="logo" /> : <MessageCircle className="pl-w-6 pl-h-6 pl-relative pl-z-10" />}
          </div>
          <div>
            <h3 className="pl-font-bold pl-text-sm">{copyText.headerTitle}</h3>
            <p className="pl-text-[10px] pl-uppercase pl-tracking-widest pl-opacity-70">{copyText.headerSubtitle}</p>
          </div>
        </div>
        {mode === 'floating' && <button onClick={toggleChat} className="pl-p-2 hover:pl-bg-white/10 pl-rounded-full pl-transition-all pl-duration-300 hover:pl-rotate-90"><X size={20} /></button>}
      </div>

      {/* Content */}
      <div className="pl-flex-1 pl-p-5 pl-overflow-y-auto pl-space-y-5 pl-scrollbar pl-relative pl-z-10">
        {messages.map((msg, i) => (
          <div key={i} className={cn("pl-flex pl-message-animate", msg.role === 'user' ? "pl-justify-end" : "pl-justify-start")} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={cn(
              "pl-max-w-[85%] pl-rounded-2xl pl-px-4 pl-py-3 pl-text-sm shadow-sm pl-markdown-content",
              msg.role === 'user' ? "pl-text-white" : "cb-bubble-bot pl-glass-panel"
            )} style={msg.role === 'user' ? { backgroundColor: colors?.accent || 'var(--pl-accent-color)' } : {}}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {/* Placeholder for typing indicator if needed later */}
      </div>

      {/* Footer */}
      <div className="pl-p-5 pl-input-area pl-relative pl-z-10">
        <form onSubmit={handleSubmit} className={cn(
          "pl-rgb-border pl-rounded-full pl-transition-all pl-duration-300",
          isTyping ? "pl-opacity-80 pl-cursor-not-allowed" : "hover:pl-shadow-md",
          inputValue.trim() && !isTyping ? "pl-scale-[1.02]" : ""
        )}>
          <div className={cn(
            "pl-rounded-full pl-flex pl-items-center pl-p-1.5 pl-transition-colors pl-duration-300",
            isTyping ? "pl-bg-slate-100 dark:pl-bg-slate-800" : "pl-bg-[rgb(var(--pl-bg-input))]"
          )}>
            <input
              className={cn(
                "pl-flex-1 pl-bg-transparent pl-px-4 pl-py-2 pl-text-sm pl-outline-none placeholder:pl-text-slate-400 pl-transition-all",
                isTyping && "pl-opacity-50"
              )}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={isTyping ? "Thinking..." : copyText.placeholder}
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={cn(
                "pl-p-2.5 pl-rounded-full pl-text-white shadow-md pl-transition-all pl-duration-300 pl-flex pl-items-center pl-justify-center",
                !inputValue.trim() && !isTyping ? "pl-opacity-50 pl-scale-90 pl-grayscale" : "hover:pl-scale-110 active:pl-scale-95",
                isTyping ? "pl-cursor-wait" : "pl-cursor-pointer"
              )}
              style={{ backgroundColor: 'var(--pl-accent-color)' }}
            >
              {isTyping ? (
                <Loader2 size={16} className="pl-animate-spin" />
              ) : (
                <Send size={16} className={cn("pl-transition-transform", inputValue.trim() ? "pl-translate-x-0.5 pl-text-white" : "")} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {mode === 'floating' && (
        <button
          onClick={toggleChat}
          className="pl-fixed pl-bottom-6 pl-right-6 pl-h-16 pl-w-16 pl-rounded-full pl-shadow-premium pl-flex pl-items-center pl-justify-center pl-z-50 pl-text-white pl-transition-all pl-duration-300 hover:pl-scale-110 hover:-pl-translate-y-1 active:pl-scale-95"
          style={{ backgroundColor: colors?.accent || 'var(--pl-accent-color)' }}
        >
          {isOpen ? <X size={28} className="pl-animate-spin-once" /> : <MessageCircle size={32} />}
        </button>
      )}
      {isOpen && renderChatWindow()}
    </>
  );
};
