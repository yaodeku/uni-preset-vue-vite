<template>
  <layout page-title="首页">
    <view class="content-wrapper">
      <text class="page-heading">欢迎使用 Uni Workspace</text>
      <view class="card-grid">
        <navigator url="/pages/auth/login" class="card">登录</navigator>
        <navigator url="/pages/auth/register" class="card">注册</navigator>
        <navigator url="/pages/user/profile" class="card">个人资料</navigator>
        <navigator url="/pages/workspaces/index" class="card">工作空间</navigator>
        <navigator url="/pages/projects/index" class="card">项目</navigator>
        <navigator url="/pages/tasks/index" class="card">任务</navigator>
      </view>
      <button class="nav-btn" @click="goToRegister">去注册</button>
    </view>
  </layout>
</template>

<script src="./index.js">
</script>

<style src="./index.css" scoped>
</style>
