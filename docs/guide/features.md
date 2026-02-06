# 配置项手册 (Configuration)

`ChatbotUI.init(config)` 方法接受以下配置对象。

## 完整配置接口

```typescript
interface ChatbotConfig {
  /** 必填：后端连接设置 */
  apiConfig: ApiConfig;
  
  /** 视觉主题 ('auto' 跟随系统, 'light' 浅色, 'dark' 深色) */
  theme?: 'auto' | 'light' | 'dark';
  
  /** 显示模式 ('floating' 悬浮球, 'embedded' 嵌入式) */
  mode?: 'floating' | 'embedded';
  
  /** 品牌定制 (Logo, 名称等) */
  brand?: BrandConfig;
  
  /** 颜色覆盖 */
  colors?: ThemeColors;
  
  /** 文案国际化覆盖 */
  copy?: CopyOverrides;
}
```

## apiConfig

| 属性名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `chatEndpoint` | `string` | **必填**。您的后端聊天接口完整 URL。 |
| `headers` | `Record<string, string>` | 可选的 HTTP 请求头（常用于鉴权，如 `Authorization`）。 |
| `extraBody` | `Record<string, any>` | 可选。每次请求都会附带的额外 Body 参数。 |

## brand (品牌定制)

自定义机器人的身份标识。

| 属性名 | 描述 |
| :--- | :--- |
| `name` | 机器人的名字 (例如 "智能客服")。 |
| `logoUrl` | Logo 图片的 URL 地址（建议正方形及 SVG）。 |
| `headerTitle` | 聊天窗口顶部的标题。 |
| `greeting` | 机器人自动发送的第一句欢迎语。 |
| `poweredByText` | 底部版权声明的文字。 |

## 核心特性

### 🌍 多语言支持

SDK 会自动检测用户浏览器的语言设置 (`en` 或 `zh`)。您可以通过 `locale` 属性强制指定，或者通过 `copy` 对象完全覆盖默认文案。

### 🌗 自动深色模式

设置 `theme: 'auto'` 后，聊天窗口会自动跟随用户操作系统的深色/浅色模式切换，提供原生的视觉体验。

### ⚡️ 丝滑动画

我们使用了基于弹簧物理 (Spring Physics) 的高性能 CSS 动画，带来如原生 App 般流畅的交互质感。
