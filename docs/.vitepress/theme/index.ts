import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    ...DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // 可以在这里插入自定义插槽
        })
    },
    enhanceApp({ app }) {
        // 注册全局组件
    }
}
