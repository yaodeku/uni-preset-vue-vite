<template>
  <layout page-title="项目">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">项目</text>
          <view class="header-actions">
            <input class="input-sm" v-model="workspace_id" placeholder="工作空间ID" />
            <input class="input-sm" v-model="title" placeholder="标题" />
            <input class="input-sm" v-model="description" placeholder="描述" />
            <button class="btn-primary" @click="createProject">新建</button>
          </view>
        </view>

        <view class="card-body">
          <view class="grid">
            <view class="project-card" v-for="p in projects" :key="p.id" @click="openDetail(p.id)">
              <text class="project-title">{{ p.title }}</text>
              <text class="project-sub">{{ p.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </layout>
</template>

<script>
import { apiGet, apiPost } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components: { Layout },
  data(){return{ projects:[], workspace_id:'', title:'', description:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/projects'); if(res.statusCode===200) this.projects = res.data.data||[] },
    async createProject(){ if(!this.workspace_id || !this.title){ uni.showToast({ title:'请填写必要信息', icon:'none' }); return }
      const res = await apiPost('/projects', { workspace_id:this.workspace_id, title:this.title, description:this.description })
      if(res.statusCode===200){ this.workspace_id=''; this.title=''; this.description=''; this.fetch(); uni.showToast({ title:'已创建', icon:'success' }) }
    },
    openDetail(id){ uni.navigateTo({ url:`/pages/projects/detail?id=${id}` }) },
  }
}
</script>

<style>
.page-root{ padding:24rpx }
.page-card{ background:#fff; border-radius:12rpx; box-shadow:0 8rpx 24rpx rgba(8,28,45,0.06); overflow:hidden }
.card-header{ display:flex; align-items:center; justify-content:space-between; padding:20rpx 24rpx; border-bottom:1rpx solid #f1f5f9 }
.page-title{ font-size:32rpx; color:#111827 }
.header-actions{ display:flex; gap:12rpx; align-items:center }
.input-sm{ padding:12rpx; border-radius:8rpx; border:1rpx solid #e6e9ee }
.btn-primary{ background:#2563eb; color:#fff; padding:10rpx 16rpx; border-radius:10rpx }

.card-body{ padding:20rpx }
.grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:16rpx }
.project-card{ background:#fff; border-radius:10rpx; padding:16rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04) }
.project-title{ font-size:28rpx; color:#0f172a }
.project-sub{ color:#6b7280; margin-top:6rpx }

@media (max-width:640px){ .grid{ grid-template-columns: repeat(1, 1fr) } }
</style>
