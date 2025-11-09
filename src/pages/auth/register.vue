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

<script>
import { apiPost } from '../../services/http.js'
export default {
  data(){ return { username:'', email:'', password:'' } },
  methods:{
    async register(){
      if(!this.username||!this.email||!this.password){ return uni.showToast({ title:'请填写完整信息', icon:'none' }) }
      if(this.password.length<6){ return uni.showToast({ title:'请设置至少6位的密码', icon:'none' }) }
      try{
        const res = await apiPost('/user/register', { username:this.username, email:this.email, password:this.password })
        if(res.statusCode===200 && res.data.status==='success'){
          uni.showToast({ title:'注册成功', icon:'success' })
          uni.navigateTo({ url:'/pages/auth/login' })
        }else{
          uni.showToast({ title: res.data.message||'注册失败', icon:'none' })
        }
      }catch(e){ uni.showToast({ title:'网络或服务器错误', icon:'none' }) }
    }
  }
}
</script>

<style>
.auth-page{ display:flex; align-items:center; justify-content:center; padding:40rpx; min-height:100vh; background: linear-gradient(180deg,#f7fafc,#eef2f7) }
.auth-card{ width:740rpx; max-width:92%; background:#fff; border-radius:16rpx; padding:36rpx; box-shadow:0 6rpx 20rpx rgba(8,28,45,0.06); display:flex; flex-direction:column; align-items:center }
.auth-brand{ width:120rpx; height:120rpx; margin-bottom:12rpx }
.auth-title{ font-size:32rpx; color:#1f2937; margin-bottom:18rpx }

.form-row{ width:100%; margin-bottom:14rpx; display:flex; flex-direction:column }
.field-label{ font-size:24rpx; color:#374151; margin-bottom:8rpx }
.input-control{ width:100%; padding:14rpx; border-radius:10rpx; border:1rpx solid #e6e9ee; box-sizing:border-box; font-size:26rpx; color:#111827 }
.input-control:focus{ outline:none; border-color:#60a5fa }

.btn-primary{ width:100%; margin-top:8rpx; background:#10b981; color:#fff; padding:16rpx; border-radius:10rpx; font-size:28rpx }
.btn-primary:active{ opacity:0.95 }

.auth-footer{ width:100%; display:flex; justify-content:center; margin-top:12rpx }
.link{ color:#2563eb }

@media (max-width:640px){
  .auth-card{ padding:24rpx; width:100% }
  .auth-title{ font-size:28rpx }
  .input-control{ font-size:24rpx }
}
</style>
