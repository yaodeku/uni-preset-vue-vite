<template>
  <view class="auth-page">
    <view class="auth-card">
      <image src="/static/logo.png" class="auth-brand" />
      <text class="auth-title">登录到 Uni Workspace</text>

      <view class="form-row">
        <label class="field-label">用户名</label>
        <input class="input-control" v-model="username" placeholder="请输入用户名" />
      </view>

      <view class="form-row">
        <label class="field-label">密码</label>
        <view class="password-row">
          <input :type="showPassword ? 'text' : 'password'" class="input-control" v-model="password" placeholder="请输入密码" />
          <button class="eye-toggle" @click="toggleShow">{{ showPassword ? '隐藏' : '显示' }}</button>
        </view>
      </view>

      <button class="btn-primary" @click="login">登录</button>

      <view class="auth-footer">
        <navigator url="/pages/auth/register" class="link">没有账号？去注册</navigator>
        <navigator url="/pages/auth/login" class="link muted">忘记密码</navigator>
      </view>
    </view>
  </view>
</template>

<script>
import { apiPost } from '../../services/http.js'
import { setToken, setUserId } from '../../utils/storage.js'
export default {
  data(){
    return { username:'', password:'', showPassword:false }
  },
  methods:{
    toggleShow(){ this.showPassword = !this.showPassword },
    async login(){
      if(!this.username||!this.password){ return uni.showToast({ title:'请填写用户名和密码', icon:'none' }) }
      try{
        const res = await apiPost('/user/login', { username:this.username, password:this.password })
        if(res.statusCode===200 && res.data.status==='success'){
          setToken(res.data.token); setUserId(res.data.user_id)
          uni.showToast({ title:'登录成功', icon:'success' })
          if(uni.switchTab) uni.switchTab({ url:'/pages/index/index' })
          else uni.reLaunch({ url:'/pages/index/index' })
        }else{
          uni.showToast({ title: res.data.message||'登录失败', icon:'none' })
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

.password-row{ display:flex; gap:12rpx; align-items:center }
.eye-toggle{ padding:8rpx 12rpx; background:transparent; border:1rpx solid #e6e9ee; border-radius:8rpx; color:#374151 }

.btn-primary{ width:100%; margin-top:8rpx; background:#2563eb; color:#fff; padding:16rpx; border-radius:10rpx; font-size:28rpx }
.btn-primary:active{ opacity:0.95 }

.auth-footer{ width:100%; display:flex; justify-content:space-between; margin-top:12rpx }
.link{ color:#2563eb }
.link.muted{ color:#9ca3af }

@media (max-width:640px){
  .auth-card{ padding:24rpx; width:100% }
  .auth-title{ font-size:28rpx }
  .input-control{ font-size:24rpx }
}
</style>
