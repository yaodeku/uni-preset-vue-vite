<template>
  <view class="register-container">
    <view class="title">用户注册</view>

    <!-- 用户名 -->
    <input
      class="input"
      v-model="username"
      placeholder="请输入用户名"
    />

    <!-- 邮箱 -->
    <input
      class="input"
      v-model="email"
      placeholder="请输入邮箱"
    />

    <!-- 密码 -->
    <input
      class="input"
      v-model="password"
      placeholder="请输入密码"
      password
    />

    <!-- 注册按钮 -->
    <button class="register-btn" @click="doRegister">注册</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { register, login } from '@/api/user.js'

const username = ref('')
const email = ref('')
const password = ref('')

const doRegister = async () => {
  if (!username.value || !email.value || !password.value) {
    uni.showToast({ title: '请完整填写信息', icon: 'none' })
    return
  }

  try {
    // 调用注册接口
    const res = await register({
      username: username.value,
      email: email.value,
      password: password.value
    })

    uni.showToast({ title: '注册成功', icon: 'success' })

    // 注册成功后自动登录
    const loginRes = await login(email.value, password.value)
    uni.setStorageSync('token', loginRes.token)

    // 跳转首页或栏目页
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }, 500)

  } catch (err) {
    console.error('注册失败', err)
  }
}
</script>

<style scoped>
.register-container {
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

.register-btn {
  width: 100%;
  background-color: #007AFF;
  color: #fff;
  padding: 14px 0;
  border-radius: 6px;
  text-align: center;
}
</style>