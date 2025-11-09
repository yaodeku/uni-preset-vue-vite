<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="module-grid">
      <navigator url="/pages/auth/login" class="module-link">登录</navigator>
      <navigator url="/pages/auth/register" class="module-link">注册</navigator>
      <navigator url="/pages/user/profile" class="module-link">个人资料</navigator>
      <navigator url="/pages/workspaces/index" class="module-link">工作空间</navigator>
      <navigator url="/pages/projects/index" class="module-link">项目</navigator>
      <navigator url="/pages/tasks/index" class="module-link">任务</navigator>
      <navigator url="/pages/tags/index" class="module-link">标签</navigator>
      <navigator url="/pages/comments/index" class="module-link">评论</navigator>
      <navigator url="/pages/attachments/index" class="module-link">附件/美术资产</navigator>
      <navigator url="/pages/notifications/index" class="module-link">通知</navigator>
      <navigator url="/pages/search/index" class="module-link">搜索</navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.module-grid{ display:grid; grid-template-columns: repeat(2, 1fr); gap: 16rpx; padding: 24rpx; width: 100%; max-width: 640rpx }
.module-link{ background-color:#f1f1f1; border-radius: 12rpx; padding: 20rpx; text-align:center; color:#333 }
</style>
