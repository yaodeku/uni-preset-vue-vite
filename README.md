## 前端工程

基于 `UniApp` + `Vue 3` + `Vite`

### 技术栈：

- `Vue 3`：渐进式JavaScript框架，用于构建用户界面
- `UniApp`：跨平台开发框架，支持编译到多个平台
- `Vite`：快速的构建工具，提供快速的开发体验
- `JavaScript`：主要开发语言

### 开发环境：

确保已安装以下工具：
- `Node.js` (推荐版本 16+)
- `npm`

安装依赖：
```bash
npm install
```

### 开发规范：

请`fork`一份本仓库，并创建一个新的分支，随后签出到创建的分支。
- 你的所有改动都必须放在这个分支上，并上传到你自己fork后的仓库。
- 确定代码完工后，请对主仓库发起`pull request`。
- 本代码采用模块化开发。
    - 请在`src`目录内为你的模块创建相应文件夹，并在文件夹内写入组件或功能模块。

### 代码规范：

1. 使用JSDoc为函数和变量添加类型注解和说明文档
```javascript
/**
 * 计算两个数的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两数之和
 */
function add(a, b) {
  return a + b;
}
```

2. 组件命名规范
- 所有的组件名必须使用大写字母开头的驼峰命名法，例如：`UserProfile.vue`、`TaskList.vue`
- 组件文件名以`.vue`结尾

3. 变量和函数命名规范
- 使用驼峰命名法，例如：`userName`、`getUserInfo()`
- 常量使用全大写字母，单词之间用下划线分割，例如：`API_BASE_URL`

4. CSS 类名规范
- 使用小写字母，单词之间用连字符分割，例如：`.user-profile`、`.task-item`

5. 文件组织规范
```
src/
├── components/        # 公共组件
├── pages/             # 页面组件
├── services/          # API服务
├── utils/             # 工具函数
├── assets/            # 静态资源
└── styles/            # 全局样式
```

### 运行和构建：

开发环境运行：
```bash
# 运行H5平台
npm run dev:h5

# 运行微信小程序
npm run dev:mp-weixin

# 运行其他平台，如支付宝小程序、百度小程序等
npm run dev:mp-alipay
```

构建项目：
```bash
# 构建H5平台
npm run build:h5

# 构建微信小程序
npm run build:mp-weixin

# 构建其他平台
npm run build:mp-alipay
```

### 组件开发规范：

1. Vue组件结构
```vue
<template>
  <!-- 组件模板 -->
</template>

<script>
// 组件逻辑
export default {
  name: 'ComponentName',
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

2. 组件通信
- 父组件向子组件传递数据使用 `props`
- 子组件向父组件传递数据使用 `$emit`
- 跨级组件通信可使用 `provide/inject`

### 路由规范：

1. 页面路由配置在 `pages.json` 文件中
2. 页面路径遵循 `pages/功能模块/页面名` 的结构
3. 导航使用 `uni.navigateTo`、`uni.redirectTo` 等 API

### 状态管理：

1. 简单状态可使用 Vue 的响应式系统
2. 复杂全局状态可使用 Vuex 或 Pinia（如果项目需要）
3. 用户信息等全局数据存储在 `utils/storage.js` 中

### API 调用规范：

1. 所有 API 调用统一在 `services/` 目录下管理
2. 使用封装好的 `request` 函数进行网络请求
3. API 地址统一配置在 `config.js` 中

### 测试规范：

1. 单元测试使用 Jest 或 Vitest
2. 组件测试使用 @testing-library/vue
3. E2E 测试使用 Cypress 或 Puppeteer
4. 测试文件放在 `__tests__` 目录中，与被测试文件保持相同结构