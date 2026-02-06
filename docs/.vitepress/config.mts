import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Chatbot UI SDK",
    description: "通用型、高可定制的 AI 聊天前端组件库",
    lang: 'zh-CN',

    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }]
    ],

    markdown: {
        // 开启代码块行号
        lineNumbers: true,
        // 使用 Shiki 的 material-theme 主题
        theme: 'material-theme-palenight'
    },

    themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'Chatbot UI SDK',

        // 顶部导航 - 中文
        nav: [
            { text: '首页', link: '/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '后端协议', link: '/guide/backend-protocol' },
            { text: '在线演示', link: 'https://chatbot-ui-sdk.vercel.app' }
        ],

        // 侧边栏 - 中文
        sidebar: [
            {
                text: '介绍',
                items: [
                    { text: '快速上手', link: '/guide/getting-started' },
                    { text: '核心特性', link: '/guide/features' },
                ]
            },
            {
                text: '集成指南',
                items: [
                    { text: '后端协议规范', link: '/guide/backend-protocol' },
                    { text: '配置项手册', link: '/guide/configuration' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/webkubor/chatbot-ui-sdk' }
        ],

        footer: {
            message: '基于 MIT 许可发布',
            copyright: '版权所有 © 2026 webkubor'
        },

        // 搜索配置 - 本地搜索
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                        noResultsText: '无法找到相关结果',
                        resetButtonTitle: '清除查询条件',
                        footer: {
                            selectText: '选择',
                            navigateText: '切换'
                        }
                    }
                }
            }
        },

        // 移动端菜单
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        }
    }
})
