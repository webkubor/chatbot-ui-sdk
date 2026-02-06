#!/bin/bash

# PayLinker Chatbot SDK 一键部署脚本
# 支持构建、发布到 npm、部署到 CDN

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        log_error "$1 命令未找到，请先安装"
        exit 1
    fi
}

# 备份当前 npm 源
backup_npm_registry() {
    ORIGINAL_REGISTRY=$(npm config get registry)
    log_info "当前 npm 源: $ORIGINAL_REGISTRY"
}

# 恢复 npm 源
restore_npm_registry() {
    log_info "恢复 npm 源到: $ORIGINAL_REGISTRY"
    npm config set registry $ORIGINAL_REGISTRY
}

# 切换到 npm 官方源
switch_to_npm_official() {
    log_info "切换到 npm 官方源..."
    npm config set registry https://registry.npmjs.org/
    log_success "已切换到 npm 官方源"
}

# 切换到淘宝源
switch_to_taobao() {
    log_info "切换到淘宝源..."
    npm config set registry https://registry.npmmirror.com/
    log_success "已切换到淘宝源"
}

# 检查 npm 登录状态
check_npm_login() {
    log_info "检查 npm 登录状态..."
    if npm whoami &> /dev/null; then
        NPM_USER=$(npm whoami)
        log_success "已登录为: $NPM_USER"
        return 0
    else
        log_warning "未登录 npm"
        return 1
    fi
}

# 安装依赖
install_dependencies() {
    log_info "安装/更新依赖..."
    if [ "$1" = "taobao" ]; then
        switch_to_taobao
    fi
    
    npm install
    
    if [ "$1" = "taobao" ]; then
        switch_to_npm_official
    fi
    
    log_success "依赖安装完成"
}

# 构建项目
build_project() {
    log_info "构建项目..."
    npm run build
    
    if [ ! -f "dist/chatbot-sdk.umd.js" ]; then
        log_error "构建失败：找不到 UMD 文件"
        exit 1
    fi
    
    log_success "项目构建完成"
    ls -la dist/
}

# 更新版本号
update_version() {
    local version_type=$1
    log_info "更新版本号 ($version_type)..."
    
    current_version=$(node -p "require('./package.json').version")
    log_info "当前版本: $current_version"
    
    npm version $version_type --no-git-tag-version
    
    new_version=$(node -p "require('./package.json').version")
    log_success "版本已更新: $current_version -> $new_version"
}

# 发布到 npm
publish_to_npm() {
    log_info "发布到 npm..."
    
    # 确保切换回官方源
    switch_to_npm_official
    
    if ! check_npm_login; then
        log_error "请先登录 npm: npm login"
        exit 1
    fi
    
    # 检查包名是否可用
    package_name=$(node -p "require('./package.json').name")
    log_info "发布包: $package_name"
    
    npm publish --access public
    log_success "发布成功！"
}

# 部署到本地文件夹（用于上传到 CDN）
deploy_to_local() {
    local deploy_dir="deploy"
    log_info "准备部署文件到 $deploy_dir/..."
    
    rm -rf $deploy_dir
    mkdir -p $deploy_dir
    
    # 复制构建文件
    cp dist/chatbot-sdk.umd.js $deploy_dir/
    cp dist/style.css $deploy_dir/
    cp package.json $deploy_dir/
    
    # 创建 CDN 使用示例
    cat > $deploy_dir/cdn-example.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PayLinker Chatbot SDK - CDN Demo</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8fafc;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        h1 {
            color: #1e293b;
            margin-bottom: 20px;
        }
        .usage-info {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        code {
            background: #e2e8f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>PayLinker Chatbot SDK CDN 演示</h1>
        
        <div class="usage-info">
            <h3>CDN 使用方式：</h3>
            <p>1. 引入 CSS：</p>
            <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>
            
            <p>2. 引入 JS：</p>
            <code>&lt;script src="chatbot-sdk.umd.js"&gt;&lt;/script&gt;</code>
            
            <p>3. 初始化：</p>
            <code>PayLinkerChatbot.init({ appId: 'your-app-id' })</code>
        </div>
        
        <p>聊天机器人将在页面右下角显示，点击即可开始对话。</p>
    </div>
    
    <script src="chatbot-sdk.umd.js"></script>
    <script>
        // 初始化聊天机器人
        PayLinkerChatbot.init({
            appId: 'demo-app-id',
            theme: 'auto',
            mode: 'floating'
        });
    </script>
</body>
</html>
EOF
    
    # 创建部署说明
    cat > $deploy_dir/README.md << 'EOF'
# PayLinker Chatbot SDK CDN 部署

## 文件说明

- `chatbot-sdk.umd.js` - 主要的 SDK 文件
- `style.css` - 样式文件
- `cdn-example.html` - 使用示例

## CDN 使用方法

### 1. 上传到 CDN

将此文件夹上传到您的 CDN 服务：
- 阿里云 OSS
- 腾讯云 COS
- AWS S3
- Vercel
- Netlify

### 2. 在页面中引用

```html
<link rel="stylesheet" href="https://your-cdn.com/path/to/style.css">
<script src="https://your-cdn.com/path/to/chatbot-sdk.umd.js"></script>
<script>
    PayLinkerChatbot.init({
        appId: 'your-app-id',
        theme: 'auto',
        mode: 'floating'
    });
</script>
```

### 3. 通过 jsDelivr（推荐）

如果已发布到 npm，可直接使用：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/paylinker-chatbot-sdk@latest/dist/style.css">
<script src="https://cdn.jsdelivr.net/npm/paylinker-chatbot-sdk@latest/dist/chatbot-sdk.umd.js"></script>
```
EOF
    
    log_success "部署文件准备完成"
    ls -la $deploy_dir/
}

# 生成 CDN 链接
generate_cdn_links() {
    local version=$(node -p "require('./package.json').version")
    log_info "CDN 使用链接："
    echo ""
    echo "=== jsDelivr CDN ==="
    echo "CSS: https://cdn.jsdelivr.net/npm/paylinker-chatbot-sdk@$version/dist/style.css"
    echo "JS:  https://cdn.jsdelivr.net/npm/paylinker-chatbot-sdk@$version/dist/chatbot-sdk.umd.js"
    echo ""
    echo "=== unpkg CDN ==="
    echo "CSS: https://unpkg.com/paylinker-chatbot-sdk@$version/dist/style.css"
    echo "JS:  https://unpkg.com/paylinker-chatbot-sdk@$version/dist/chatbot-sdk.umd.js"
    echo ""
    echo "=== 使用示例 ==="
    echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/paylinker-chatbot-sdk@'$version'/dist/style.css">'
    echo '<script src="https://cdn.jsdelivr.net/npm/paylinker-chatbot-sdk@'$version'/dist/chatbot-sdk.umd.js"></script>'
    echo '<script>PayLinkerChatbot.init({ appId: "your-app-id" });</script>'
}

# 显示帮助信息
show_help() {
    echo "PayLinker Chatbot SDK 一键部署脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help          显示帮助信息"
    echo "  -t, --taobao        使用淘宝源安装依赖"
    echo "  -p, --patch         更新补丁版本 (x.x.X)"
    echo "  -m, --minor         更新次版本 (x.X.x)"
    echo "  -M, --major         更新主版本 (X.x.x)"
    echo "  --build-only        仅构建，不发布"
    echo "  --local-only        仅准备本地部署文件"
    echo ""
    echo "示例:"
    echo "  $0                  # 完整部署流程"
    echo "  $0 -t -p            # 使用淘宝源，更新补丁版本并发布"
    echo "  $0 --build-only     # 仅构建项目"
    echo "  $0 --local-only     # 仅准备本地部署文件"
}

# 主函数
main() {
    local use_taobao=false
    local version_type="patch"
    local build_only=false
    local local_only=false
    
    # 解析参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -t|--taobao)
                use_taobao=true
                shift
                ;;
            -p|--patch)
                version_type="patch"
                shift
                ;;
            -m|--minor)
                version_type="minor"
                shift
                ;;
            -M|--major)
                version_type="major"
                shift
                ;;
            --build-only)
                build_only=true
                shift
                ;;
            --local-only)
                local_only=true
                shift
                ;;
            *)
                log_error "未知参数: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 开始部署流程
    log_info "开始 PayLinker Chatbot SDK 部署流程..."
    
    # 检查必要命令
    check_command "node"
    check_command "npm"
    
    # 备份当前设置
    backup_npm_registry
    
    # 设置退出时恢复
    trap restore_npm_registry EXIT
    
    if [ "$local_only" = true ]; then
        # 仅准备本地部署文件
        build_project
        deploy_to_local
        log_success "本地部署文件准备完成！"
        exit 0
    fi
    
    if [ "$build_only" = true ]; then
        # 仅构建
        install_dependencies $([ "$use_taobao" = true ] && echo "taobao")
        build_project
        log_success "构建完成！"
        exit 0
    fi
    
    # 完整部署流程
    install_dependencies $([ "$use_taobao" = true ] && echo "taobao")
    build_project
    update_version $version_type
    publish_to_npm
    deploy_to_local
    
    # 生成 CDN 链接
    generate_cdn_links
    
    log_success "🎉 部署完成！"
    echo ""
    log_info "下一步："
    echo "1. 用户可以通过 CDN 链接直接使用"
    echo "2. 将 deploy/ 文件夹上传到您的自定义 CDN"
    echo "3. 在项目中更新版本号引用"
}

# 运行主函数
main "$@"
