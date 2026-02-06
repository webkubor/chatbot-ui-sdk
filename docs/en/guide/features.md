# Configuration Reference

The `ChatbotUI.init(config)` method accepts the following configuration object.

## Config Interface

```typescript
interface ChatbotConfig {
  /** Required: Backend connection settings */
  apiConfig: ApiConfig;
  
  /** Visual theme ('auto' follows system preference) */
  theme?: 'auto' | 'light' | 'dark';
  
  /** Display mode */
  mode?: 'floating' | 'embedded';
  
  /** Branding customization */
  brand?: BrandConfig;
  
  /** Color theme overrides */
  colors?: ThemeColors;
  
  /** Text localization overrides */
  copy?: CopyOverrides;
}
```

## apiConfig

| Property | Type | Description |
| :--- | :--- | :--- |
| `chatEndpoint` | `string` | **Required**. The full URL of your backend chat endpoint. |
| `headers` | `Record<string, string>` | Optional HTTP headers (e.g. `Authorization`). |
| `extraBody` | `Record<string, any>` | Optional request body parameters to send with every request. |

## brand

Customize the identity of your chatbot.

| Property | Description |
| :--- | :--- |
| `name` | The name of the bot (e.g., "Support Bot"). |
| `logoUrl` | URL to a square logo image. |
| `headerTitle` | Title shown in the chat window header. |
| `greeting` | The first message the bot sends automatically. |
| `poweredByText` | Text for the footer attribution. |

## features

### 🌍 Multilingual Support

The SDK automatically detects the user's browser language (`en` or `zh`). You can override this using the `locale` prop or by providing custom strings in the `copy` object.

### 🌗 Auto Dark Mode

Set `theme: 'auto'` to have the chatbot automatically switch between light and dark modes based on the user's OS settings.

### ⚡️ Animations

We use high-performance CSS animations (spring physics) for a "silky smooth" mobile-app-like feel.
