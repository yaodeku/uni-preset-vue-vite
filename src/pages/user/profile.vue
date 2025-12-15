<template>
  <view class="profile-container">

    <view class="title">个人资料</view>

    <view class="info-item">
      <text class="label">用户ID：</text>
      <text>{{ userInfo._id }}</text>
    </view>

    <view class="info-item">
      <text class="label">用户名：</text>
      <input
        class="input"
        v-model="userInfo.username"
        placeholder="请输入用户名"
      />
    </view>

    <view class="info-item">
      <text class="label">邮箱：</text>
      <input
        class="input"
        v-model="userInfo.email"
        placeholder="请输入邮箱"
      />
    </view>

    <view class="info-item">
      <text class="label">注册时间：</text>
      <text>{{ userInfo.created_at }}</text>
    </view>

    <button class="save-btn" @click="updateInfo">保存资料</button>

    <button class="logout-btn" @click="logoutUser">退出登录</button>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile, logout } from '@/api/user.js'

const userInfo = ref({
  _id: '',
  username: '',
  email: '',
  created_at: ''
})

const loadUserInfo = async () => {
  try {
    // 根据你的后端规则，如果 token 含有 userId，需要手动取出
    const userId = uni.getStorageSync('userId')

    const res = await getProfile(userId)

    userInfo.value = res.user
  } catch (err) {
    console.error('获取用户资料失败', err)
  }
}

// 保存更新资料
const updateInfo = async () => {
  try {
    const userId = userInfo.value._id

    await updateProfile(userId, {
      username: userInfo.value.username,
      email: userInfo.value.email
    })

    uni.showToast({ title: '资料已更新', icon: 'success' })
  } catch (err) {
    console.error('更新资料失败', err)
  }
}

// 退出登录
const logoutUser = async () => {
  try {
    await logout()
    uni.removeStorageSync('token')
    uni.removeStorageSync('userId')

    uni.redirectTo({
      url: '/pages/user/login'
    })
  } catch (err) {
    console.error('退出失败', err)
  }
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
.profile-container {
  padding: 40px;
}

.title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.save-btn {
  margin-top: 20px;
  background-color: #42b983;
  color: #fff;
  padding: 14px 0;
  border-radius: 6px;
}

.logout-btn {
  margin-top: 20px;
  background-color: #ff4d4f;
  color: #fff;
  padding: 14px 0;
  border-radius: 6px;
}
</style>