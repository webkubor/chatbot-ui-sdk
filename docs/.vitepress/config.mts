import { defineConfig } from 'vitepress'

export default defineConfig({
    base: '/omni-chatbot-sdk/',
    title: "Chatbot UI SDK",
    description: "A universal, lightweight, and highly customizable chatbot frontend UI SDK.",

    // 核心：启用国际化路由
    locales: {
        // 根目录为中文
        root: {
            label: '简体中文',
            lang: 'zh-CN',
            title: 'Chatbot UI SDK',
            description: '通用型、高可定制的 AI 聊天前端组件库',
            themeConfig: {
                nav: [
                    { text: '首页', link: '/' },
                    { text: '快速开始', link: '/guide/getting-started' },
                    { text: '后端协议', link: '/guide/backend-protocol' },
                    { text: '在线演示', link: 'https://omni-chatbot-sdk.vercel.app' }
                ],
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
                outline: { label: '页面导航' },
                docFooter: { prev: '上一页', next: '下一页' }
            }
        },
        // /en/ 目录为英文
        en: {
            label: 'English',
            lang: 'en-US',
            link: '/en/',
            title: 'Chatbot UI SDK',
            description: 'Universal AI Frontend Widget & SDK',
            themeConfig: {
                nav: [
                    { text: 'Home', link: '/en/' },
                    { text: 'Guide', link: '/en/guide/getting-started' },
                    { text: 'Protocol', link: '/en/guide/backend-protocol' },
                    { text: 'Playground', link: 'https://omni-chatbot-sdk.vercel.app' }
                ],
                sidebar: [
                    {
                        text: 'Introduction',
                        items: [
                            { text: 'Getting Started', link: '/en/guide/getting-started' },
                            { text: 'Features', link: '/en/guide/features' },
                        ]
                    },
                    {
                        text: 'Integration',
                        items: [
                            { text: 'Backend Protocol', link: '/en/guide/backend-protocol' },
                            { text: 'Configuration', link: '/en/guide/configuration' },
                        ]
                    }
                ],
                outline: { label: 'On this page' },
                docFooter: { prev: 'Previous page', next: 'Next page' }
            }
        }
    },

    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }]
    ],

    markdown: {
        lineNumbers: true,
        theme: 'material-theme-palenight'
    },

    themeConfig: {
        logo: '/logo.svg',

        // 社交链接是公用的
        socialLinks: [
            { icon: 'github', link: 'https://github.com/webkubor/omni-chatbot-sdk' }
        ],

        // 搜索配置
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
                            modal: { noResultsText: '无法找到相关结果', resetButtonTitle: '清除查询条件' }
                        }
                    },
                    en: {
                        translations: {
                            button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
                            modal: { noResultsText: 'No results found', resetButtonTitle: 'Reset search' }
                        }
                    }
                }
            }
        }
    }
})
