<template>
  <view class="register-container">
    <view class="register-box">
      <view class="title">账号注册</view>
      <view class="form-item">
        <input 
          type="text" 
          v-model="email" 
          placeholder="请输入邮箱"
          class="input"
        />
      </view>
      <view class="form-item">
        <input 
          :type="showPassword ? 'text' : 'password'" 
          v-model="password" 
          placeholder="请输入密码"
          class="input"
        />
        <text class="eye-icon" @click="togglePassword">
          {{ showPassword ? '👁️' : '👁️‍🗨️' }}
        </text>
      </view>
      <view class="form-item">
        <input 
          :type="showPassword ? 'text' : 'password'" 
          v-model="confirmPassword" 
          placeholder="请确认密码"
          class="input"
        />
      </view>
      <button class="register-btn" @click="handleRegister">注册</button>
      <view class="login-link" @click="goToLogin">已有账号？立即登录</view>
    </view>
  </view>
</template>

<script src="./register.js">
</script>

<style src="./register.css" scoped>
</style>
