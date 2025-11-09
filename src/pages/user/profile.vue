<template>
  <view class="profile-container">
    <text class="screen-title">个人资料</text>
    <view class="form-field"><input class="text-input" v-model="full_name" placeholder="姓名" /></view>
    <view class="form-field"><input class="text-input" v-model="display_name" placeholder="显示名" /></view>
    <view class="form-field"><input class="text-input" v-model="bio" placeholder="简介" /></view>
    <button class="primary-button" @click="save">保存</button>
    <button class="danger-button" @click="logout">退出登录</button>
  </view>
</template>

<script>
import { apiGet, apiPut, apiPost } from '../../services/http.js'
import { getUserId, clearToken } from '../../utils/storage.js'
export default {
  data(){return{ full_name:'', display_name:'', bio:'' }},
  async onLoad(){
    const id = getUserId(); if(!id){ return }
    const res = await apiGet(`/user/profile/${id}`)
    if(res.statusCode===200 && res.data.status==='success'){
      const d = res.data.data || {}
      this.full_name=d.full_name||''; this.display_name=d.display_name||''; this.bio=d.bio||''
    }
  },
  methods:{
    async save(){
      const id = getUserId(); if(!id){ return }
      const res = await apiPut(`/user/profile/${id}`, { full_name:this.full_name, display_name:this.display_name, bio:this.bio })
      if(res.statusCode===200 && res.data.status==='success'){ uni.showToast({ title:'已保存', icon:'success' }) }
    },
    async logout(){
      await apiPost('/user/logout', {})
      clearToken();
      uni.reLaunch({ url:'/pages/auth/login' })
    }
  }
}
</script>

<style>
.profile-container{ padding: 24rpx }
.screen-title{ font-size: 36rpx; color: #333; margin: 24rpx 0 }
.form-field{ margin: 12rpx 0 }
.text-input{ border: 1px solid #c8c7cc; border-radius: 6rpx; padding: 16rpx }
.primary-button{ background-color: #007aff; color: #fff; border-radius: 6rpx; padding: 16rpx; margin-top: 16rpx }
.danger-button{ background-color: #dd524d; color:#fff; border-radius:6rpx; padding:16rpx; margin-top: 12rpx }
</style>
