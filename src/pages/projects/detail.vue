<template>
  <layout page-title="项目详情">
    <view class="page-root">
      <view class="page-card detail-card">
        <view class="card-header"><text class="page-title">项目详情</text></view>
        <view class="card-body" v-if="project">
          <view class="form-row"><label class="field-label">标题</label><input class="input-control" v-model="project.title" /></view>
          <view class="form-row"><label class="field-label">描述</label><input class="input-control" v-model="project.description" /></view>
          <button class="btn-primary" @click="save">保存</button>
        </view>
      </view>
    </view>
  </layout>
</template>

<script>
import { apiGet, apiPut } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default { components:{ Layout }, data(){return{ id:'', project:null }}, async onLoad(q){ this.id=q.id; const res = await apiGet(`/projects/${this.id}`); if(res.statusCode===200) this.project = res.data.data }, methods:{ async save(){ const res = await apiPut(`/projects/${this.id}`, { title:this.project.title, description:this.project.description }); if(res.statusCode===200){ uni.showToast({ title:'已保存', icon:'success' }) } } } }
</script>

<style>
.page-root{ padding:24rpx }
.page-card{ background:#fff; border-radius:12rpx; box-shadow:0 8rpx 24rpx rgba(8,28,45,0.06); overflow:hidden }
.card-header{ padding:20rpx 24rpx; border-bottom:1rpx solid #f1f5f9 }
.page-title{ font-size:28rpx; color:#0f172a }
.card-body{ padding:20rpx }
.form-row{ margin-bottom:12rpx }
.field-label{ font-size:24rpx; color:#374151; margin-bottom:6rpx }
.input-control{ width:100%; padding:12rpx; border-radius:8rpx; border:1rpx solid #e6e9ee }
.btn-primary{ margin-top:12rpx; background:#2563eb; color:#fff; padding:12rpx; border-radius:8rpx }
</style>
