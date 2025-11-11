<template>
  <view class="auth-page">
    <view class="auth-card">
      <image src="/static/logo.png" class="auth-brand" />
      <text class="auth-title">创建你的账号</text>

      <view class="form-row">
        <label class="field-label">用户名</label>
        <input class="input-control" v-model="username" placeholder="选择一个用户名" />
      </view>

      <view class="form-row">
        <label class="field-label">邮箱</label>
        <input type="email" class="input-control" v-model="email" placeholder="你的邮箱地址" />
      </view>

      <view class="form-row">
        <label class="field-label">密码</label>
        <input type="password" class="input-control" v-model="password" placeholder="设置密码（最少6位）" />
      </view>

      <button class="btn-primary" @click="register">注册账号</button>

      <view class="auth-footer">
        <navigator url="/pages/auth/login" class="link">已有账号？去登录</navigator>
      </view>
    </view>
  </view>
</template>

<script src="./register.js">
</script>

<style src="./register.css">
</style>
