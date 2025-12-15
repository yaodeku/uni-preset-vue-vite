<template>
  <view class="login-container">
    <view class="title">用户登录</view>

    <!-- 输入邮箱 -->
    <input
      class="input"
      v-model="email"
      placeholder="请输入邮箱"
    />

    <!-- 输入密码 -->
    <input
      class="input"
      v-model="password"
      placeholder="请输入密码"
      password
    />

    <!-- 登录按钮 -->
    <button class="login-btn" @click="doLogin">登录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/api/user.js'

const email = ref('')
const password = ref('')

const doLogin = async () => {
  if (!email.value || !password.value) {
    uni.showToast({ title: '请输入邮箱和密码', icon: 'none' })
    return
  }

  try {
    const res = await login(email.value, password.value)

    // 保存 token
    uni.setStorageSync('token', res.token)

    uni.showToast({ title: '登录成功', icon: 'success' })

    // 跳转到首页或工作空间列表
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }, 500)

  } catch (err) {
    console.error('登录失败', err)
  }
}
</script>

<style scoped>
.login-container {
  padding: 40px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}

.input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.login-btn {
  width: 100%;
  background-color: #42b983;
  color: #fff;
  padding: 14px 0;
  border-radius: 6px;
  text-align: center;
}
</style>