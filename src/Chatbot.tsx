import React from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from './lib/utils';
import { ChatbotProps } from './types';
import { useChatbot } from './hooks/useChatbot';
import './styles.css';

/** 通用机器人图标 (Neural Spark - 简化版) */
const DefaultLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M128 32C72.8 32 28 73.2 28 124C28 148.4 39.6 170.6 58.8 186.2L46 224L90.6 205.8C102.2 209.8 114.8 212 128 212C183.2 212 228 170.8 228 120C228 73.2 183.2 32 128 32Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M128 32C72.8 32 28 73.2 28 124C28 148.4 39.6 170.6 58.8 186.2L46 224L90.6 205.8C102.2 209.8 114.8 212 128 212C183.2 212 228 170.8 228 120C228 73.2 183.2 32 128 32Z" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M128 72L140 108L176 120L140 132L128 168L116 132L80 120L116 108L128 72Z" fill="currentColor"/>
  </svg>
);

export const Chatbot: React.FC<ChatbotProps> = (props) => {
  const { mode = 'floating', brand, colors } = props;
  const {
    isOpen,
    isDarkMode,
    copyText,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    toggleChat,
    handleSubmit
  } = useChatbot(props);

  const renderChatWindow = () => (
    <div
      className={cn(
        "pl-flex pl-flex-col pl-overflow-hidden pl-float-animate",
        isDarkMode ? "pl-dark-mode pl-bg-slate-900" : "pl-bg-white",
        mode === 'floating' 
          ? "pl-fixed pl-bottom-24 pl-right-6 pl-w-[380px] pl-h-[600px] pl-max-h-[calc(100vh-120px)] pl-rounded-3xl pl-z-50 pl-shadow-2xl max-sm:pl-w-[calc(100vw-24px)] max-sm:pl-right-3 max-sm:pl-left-3 max-sm:pl-bottom-20"
          : "pl-h-full pl-w-full pl-rounded-2xl"
      )}
      style={{
        '--pl-accent-color': colors?.accent || (isDarkMode ? '#60a5fa' : '#104EFF'),
        'border': '1px solid var(--pl-border)', // 使用动态变量边框
        ...(colors?.accentHover ? { '--pl-accent-hover': colors.accentHover } : {}),
        ...(colors?.accentSoft ? { '--pl-accent-soft': colors.accentSoft } : {})
      } as any}
    >
      {/* 顶部标题栏 */}
      <div className={cn(
        "pl-p-5 pl-flex pl-justify-between pl-items-center pl-relative pl-z-10",
        isDarkMode ? "pl-bg-slate-800/80 pl-backdrop-blur-md" : "pl-bg-slate-900 pl-text-white"
      )} style={{ borderBottom: '1px solid var(--pl-border)' }}>
        <div className="pl-flex pl-items-center pl-gap-3.5">
          <div className={cn(
            "pl-w-10 pl-h-10 pl-rounded-full pl-flex pl-items-center pl-justify-center pl-transition-all",
            isDarkMode ? "pl-bg-blue-500/10 pl-text-blue-400" : "pl-bg-white/10 pl-text-white"
          )}>
            {brand?.logo ? brand.logo : 
             brand?.logoUrl ? <img src={brand.logoUrl} className="pl-w-6 pl-h-6 pl-object-contain" alt="brand" /> :
             brand?.logoSvg ? <span className="pl-w-6 pl-h-6" dangerouslySetInnerHTML={{ __html: brand.logoSvg }} /> :
             <DefaultLogo className="pl-w-7 pl-h-7" />}
          </div>
          <div>
            <h3 className={cn("pl-font-bold pl-text-sm pl-tracking-tight", isDarkMode ? "pl-text-slate-100" : "pl-text-white")}>
              {copyText.headerTitle}
            </h3>
            <div className="pl-flex pl-items-center pl-gap-1.5">
              <span className="pl-w-1.5 pl-h-1.5 pl-rounded-full pl-bg-emerald-500 pl-animate-pulse"></span>
              <p className={cn("pl-text-[10px] pl-uppercase pl-tracking-widest pl-font-medium", isDarkMode ? "pl-text-slate-400" : "pl-text-slate-300")}>
                {copyText.headerSubtitle}
              </p>
            </div>
          </div>
        </div>
        {mode === 'floating' && (
          <button onClick={toggleChat} className={cn(
            "pl-p-2 pl-rounded-full pl-transition-all active:pl-scale-90",
            isDarkMode ? "hover:pl-bg-white/5 pl-text-slate-400" : "hover:pl-bg-white/10 pl-text-white"
          )}>
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* 消息列表区域 */}
      <div className={cn(
        "pl-flex-1 pl-p-5 pl-overflow-y-auto pl-space-y-5 pl-scrollbar pl-relative",
        isDarkMode ? "pl-bg-slate-900" : "pl-bg-slate-50"
      )}>
         {messages.map((msg, i) => (
          <div key={i} className={cn("pl-flex pl-message-animate", msg.role === 'user' ? "pl-justify-end" : "pl-justify-start")}>
            <div className={cn(
              "pl-max-w-[85%] pl-rounded-2xl pl-px-4 pl-py-3 pl-text-sm pl-leading-relaxed pl-shadow-sm",
              msg.role === 'user' 
                ? "pl-bg-blue-600 pl-text-white pl-rounded-br-none" 
                : isDarkMode 
                  ? "pl-bg-slate-800 pl-text-slate-100 pl-rounded-bl-none"
                  : "pl-bg-white pl-text-slate-800 pl-rounded-bl-none"
            )} style={{ 
                ...(msg.role === 'user' && colors?.accent ? { backgroundColor: colors.accent } : {}),
                border: msg.role === 'assistant' ? '1px solid var(--pl-border)' : 'none'
            }}>
              {msg.role === 'assistant' ? (
                <div className="pl-markdown-content">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="pl-flex pl-justify-start pl-animate-in pl-fade-in pl-duration-300">
            <div className={cn(
              "pl-px-4 pl-py-4 pl-rounded-2xl pl-rounded-bl-none pl-shadow-sm",
              isDarkMode ? "pl-bg-slate-800" : "pl-bg-white"
            )} style={{ border: '1px solid var(--pl-border)' }}>
              <div className="pl-flex pl-items-center pl-space-x-1.5">
                <div className={cn("pl-w-1.5 pl-h-1.5 pl-rounded-full pl-typing-dot", isDarkMode ? "pl-bg-blue-400" : "pl-bg-blue-600")}></div>
                <div className={cn("pl-w-1.5 pl-h-1.5 pl-rounded-full pl-typing-dot", isDarkMode ? "pl-bg-blue-400" : "pl-bg-blue-600")} style={{animationDelay: '0.2s'}}></div>
                <div className={cn("pl-w-1.5 pl-h-1.5 pl-rounded-full pl-typing-dot", isDarkMode ? "pl-bg-blue-400" : "pl-bg-blue-600")} style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 输入框区域 */}
      <div className={cn(
        "pl-p-5 pl-relative",
        isDarkMode ? "pl-bg-slate-800/50" : "pl-bg-white"
      )} style={{ borderTop: '1px solid var(--pl-border)' }}>
        <form onSubmit={handleSubmit} className="pl-rgb-border pl-rounded-full pl-transition-all hover:pl-scale-[1.01]">
          <div className={cn(
            "pl-rounded-full pl-flex pl-items-center pl-p-1.5 pl-relative pl-z-10",
            isDarkMode ? "pl-bg-slate-700" : "pl-bg-white"
          )}>
            <input 
              className={cn(
                "pl-flex-1 pl-bg-transparent pl-px-4 pl-py-2 pl-text-sm pl-outline-none",
                isDarkMode ? "pl-text-slate-100 placeholder:pl-text-slate-500" : "pl-text-slate-700 placeholder:pl-text-slate-400"
              )}
              placeholder={copyText.placeholder}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping} 
              className={cn(
                "pl-p-2.5 pl-rounded-full pl-text-white pl-transition-all active:pl-scale-90 disabled:pl-opacity-50 pl-shadow-md",
                isDarkMode ? "pl-bg-blue-500 hover:pl-bg-blue-400" : "pl-bg-slate-900"
              )}
              style={colors?.accent ? { backgroundColor: colors.accent } : {}}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
        <div className="pl-text-center pl-mt-4">
            <a href={brand?.poweredByUrl || "#"} target="_blank" rel="noopener noreferrer" className={cn(
              "pl-text-[10px] pl-uppercase pl-tracking-widest pl-transition-colors pl-font-bold",
              isDarkMode ? "pl-text-slate-500 hover:pl-text-blue-400" : "pl-text-slate-400 hover:pl-text-blue-600"
            )}>
             {copyText.poweredBy} <span className={isDarkMode ? "pl-text-slate-300" : "pl-text-slate-600"}>{brand?.poweredByName || "AI SDK"}</span>
            </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mode === 'floating' && (
        <button
          onClick={toggleChat}
          className={cn(
            "pl-fixed pl-bottom-6 pl-right-6 pl-h-16 pl-w-16 pl-rounded-full pl-shadow-2xl pl-flex pl-items-center pl-justify-center pl-z-50 pl-transition-all pl-duration-500 hover:pl-scale-110 active:pl-scale-95",
            isOpen 
              ? isDarkMode ? "pl-bg-slate-800 pl-text-white pl-rotate-90" : "pl-bg-slate-900 pl-text-white pl-rotate-90"
              : isDarkMode ? "pl-bg-blue-500 pl-text-white" : "pl-bg-blue-600 pl-text-white"
          )}
          style={{
            ...(!isOpen && colors?.accent ? { backgroundColor: colors.accent } : {}),
            'border': '1px solid var(--pl-border)' // 悬浮按钮也加一个细腻边框
          } as any}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
        </button>
      )}
      {(isOpen || mode === 'embedded') && renderChatWindow()}
    </>
  );
};
