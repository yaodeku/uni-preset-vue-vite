<template>
  <view class="screen-container">
    <text class="screen-title">项目详情</text>
    <view v-if="project">
      <view class="form-field"><input class="text-input" v-model="project.title" placeholder="标题" /></view>
      <view class="form-field"><input class="text-input" v-model="project.description" placeholder="描述" /></view>
      <button class="primary-button" @click="save">保存</button>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPut } from '../../services/http.js'
export default { data(){return{ id:'', project:null }}, async onLoad(q){ this.id=q.id; const res = await apiGet(`/projects/${this.id}`); if(res.statusCode===200) this.project = res.data.data }, methods:{ async save(){ const res = await apiPut(`/projects/${this.id}`, { title:this.project.title, description:this.project.description }); if(res.statusCode===200){ uni.showToast({ title:'已保存', icon:'success' }) } } } }
</script>

<style>
.screen-container{ padding:24rpx }
.screen-title{ font-size:36rpx; color:#333; margin:24rpx 0 }
.form-field{ margin: 12rpx 0 }
.text-input{ border:1px solid #c8c7cc; border-radius:6rpx; padding:16rpx }
.primary-button{ background-color:#007aff; color:#fff; border-radius:6rpx; padding:16rpx; margin-top:12rpx }
</style>
