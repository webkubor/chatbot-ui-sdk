import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chatbot } from './Chatbot';
import { ChatbotProps } from './types';
import './styles.css';

declare global {
  interface Window {
    ChatbotUI: {
      init: (configOrUrl: ChatbotProps | string) => Promise<void>;
    };
  }
}

const init = async (configOrUrl: ChatbotProps | string) => {
  if (typeof document === 'undefined') return;

  const rootId = 'chatbot-ui-root';
  const existingRoot = document.getElementById(rootId);
  if (existingRoot) existingRoot.remove();

  let config: ChatbotProps;
  if (typeof configOrUrl === 'string') {
    try {
      const response = await fetch(configOrUrl);
      config = await response.json();
    } catch (e) {
      console.error('Failed to load chatbot config:', e);
      return;
    }
  } else {
    config = configOrUrl;
  }

  const container = document.createElement('div');
  container.id = rootId;
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(Chatbot, config));
};

const ChatbotUI = { init };

if (typeof window !== 'undefined') {
  window.ChatbotUI = ChatbotUI;
}

export { ChatbotUI, Chatbot };
export type { ChatbotProps };
