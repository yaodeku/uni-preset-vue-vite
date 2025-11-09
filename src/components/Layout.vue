<template>
  <view class="app-root">
    <view class="sidebar">
      <image src="/static/logo.png" class="sidebar-logo" />
      <view class="sidebar-nav">
        <navigator url="/pages/workspaces/index" class="sidebar-link">工作空间</navigator>
        <navigator url="/pages/projects/index" class="sidebar-link">项目</navigator>
        <navigator url="/pages/tasks/index" class="sidebar-link">任务</navigator>
        <navigator url="/pages/tags/index" class="sidebar-link">标签</navigator>
        <navigator url="/pages/comments/index" class="sidebar-link">评论</navigator>
        <navigator url="/pages/attachments/index" class="sidebar-link">附件</navigator>
        <navigator url="/pages/notifications/index" class="sidebar-link">通知</navigator>
        <navigator url="/pages/search/index" class="sidebar-link">搜索</navigator>
      </view>
    </view>

    <view class="main-area">
      <view class="topbar">
        <text class="topbar-title">{{ pageTitle || '仪表盘' }}</text>
        <view class="topbar-status">
          <text class="status-text">状态: Ready</text>
          <navigator url="/pages/auth/login" class="action-link">登录</navigator>
          <navigator url="/pages/auth/register" class="action-link">注册</navigator>
        </view>
      </view>

      <view class="content-body">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Layout',
  props: { pageTitle: { type: String, default: '' } }
}
</script>

<style>
.app-root{ display:flex; min-height:100vh; background: var(--background-color, #F8F8F8); }
.sidebar{ width:280rpx; background:#ffffff; border-right:1rpx solid rgba(0,0,0,0.06); padding:24rpx; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; }
.sidebar-logo{ width:120rpx; height:120rpx; margin-bottom:20rpx }
.sidebar-nav{ width:100%; display:flex; flex-direction:column; gap:12rpx }
.sidebar-link{ display:block; padding:12rpx 16rpx; border-radius:10rpx; color:#333; background:transparent; text-align:left }
.sidebar-link:active{ background:#f5f5f5 }
.main-area{ flex:1; display:flex; flex-direction:column }
.topbar{ height:88rpx; display:flex; align-items:center; justify-content:space-between; padding:0 24rpx; background:var(--navigationBarBackgroundColor, #F8F8F8); border-bottom:1rpx solid rgba(0,0,0,0.04) }
.topbar-title{ font-size:30rpx; color:#333 }
.topbar-status{ display:flex; align-items:center; gap:12rpx }
.status-text{ color:#666 }
.action-link{ padding:8rpx 12rpx; background:#007bff; color:#fff; border-radius:8rpx }
.content-body{ padding:24rpx }
@media (max-width: 640px){ .app-root{ flex-direction:column } .sidebar{ width:100%; flex-direction:row; padding:12rpx; gap:12rpx; overflow:auto } .sidebar-nav{ flex-direction:row } }
</style>
