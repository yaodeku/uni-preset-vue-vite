<template>
  <view class="auth-container">
    <text class="screen-title">注册</text>
    <view class="form-field"><input class="text-input" v-model="username" placeholder="用户名" /></view>
    <view class="form-field"><input class="text-input" v-model="email" placeholder="邮箱" /></view>
    <view class="form-field"><input class="text-input" v-model="password" placeholder="密码" password /></view>
    <button class="primary-button" @click="register">注册</button>
  </view>
</template>

<script>
import { apiPost } from '../../services/http.js'
export default {
  data(){return{ username:'', email:'', password:'' }},
  methods:{
    async register(){
      if(!this.username||!this.email||!this.password){ return uni.showToast({ title:'请填写完整信息', icon:'none' }) }
      const res = await apiPost('/user/register', { username:this.username, email:this.email, password:this.password })
      if(res.statusCode===200 && res.data.status==='success'){
        uni.showToast({ title:'注册成功', icon:'success' });
        uni.navigateTo({ url:'/pages/auth/login' })
      }else{ uni.showToast({ title: res.data.message||'注册失败', icon:'none' }) }
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
</style>
