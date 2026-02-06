import { ReactNode } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ApiConfig {
  /** 后端聊天接口地址 */
  chatEndpoint: string;
  /** 自定义请求头 (例如 Authorization) */
  headers?: Record<string, string>;
  /** 额外附带的 body 参数 */
  extraBody?: Record<string, any>;
}

export interface CopyStrings {
  greeting: string;
  headerTitle: string;
  headerSubtitle: string;
  placeholder: string;
  closeChatLabel: string;
  errorMessage: string;
  poweredBy: string;
}

export type Locale = 'en' | 'zh';

export interface BrandConfig {
  name?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  greeting?: string;
  poweredByText?: string;
  poweredByName?: string;
  poweredByUrl?: string;
  logoSvg?: string;
  logoUrl?: string;
  logo?: ReactNode;
}

export interface CopyOverrides {
  en?: Partial<CopyStrings>;
  zh?: Partial<CopyStrings>;
}

export interface ThemeColors {
  accent?: string;
  accentHover?: string;
  accentSoft?: string;
}

export interface ChatbotProps {
  appId: string;
  apiConfig: ApiConfig;
  theme?: 'auto' | 'light' | 'dark';
  mode?: 'floating' | 'embedded';
  locale?: 'auto' | Locale;
  brand?: BrandConfig;
  copy?: CopyOverrides;
  colors?: ThemeColors;
}
