<template>
  <view class="auth-container">
    <text class="screen-title">登录</text>
    <view class="form-field"><input class="text-input" v-model="username" placeholder="用户名" /></view>
    <view class="form-field"><input class="text-input" v-model="password" placeholder="密码" password /></view>
    <button class="primary-button" @click="login">登录</button>
    <view class="secondary-actions">
      <navigator url="/pages/auth/register" class="link">没有账号？去注册</navigator>
    </view>
  </view>
</template>

<script>
import { apiPost } from '../../services/http.js'
import { setToken, setUserId } from '../../utils/storage.js'
export default {
  data(){return{ username:'', password:'' }},
  methods:{
    async login(){
      if(!this.username||!this.password){ return uni.showToast({ title:'请填写用户名和密码', icon:'none' }) }
      const res = await apiPost('/user/login', { username:this.username, password:this.password })
      if(res.statusCode===200 && res.data.status==='success'){
        setToken(res.data.token); setUserId(res.data.user_id)
        uni.showToast({ title:'登录成功', icon:'success' })
        uni.switchTab? uni.switchTab({ url:'/pages/index/index' }): uni.reLaunch({ url:'/pages/index/index' })
      }else{ uni.showToast({ title: res.data.message||'登录失败', icon:'none' }) }
    }
  }
}
</script>

<style>
.auth-container{ padding: 24rpx }
.screen-title{ font-size: 36rpx; color: #333; margin: 24rpx 0 }
.form-field{ margin: 12rpx 0 }
.text-input{ border: 1px solid #c8c7cc; border-radius: 6rpx; padding: 16rpx }
.primary-button{ background-color: #007aff; color: #fff; border-radius: 6rpx; padding: 16rpx; margin-top: 16rpx }
.secondary-actions{ margin-top: 16rpx }
.link{ color: #007aff }
</style>
