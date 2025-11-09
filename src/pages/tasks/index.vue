<template>
  <layout page-title="任务">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">任务</text>
          <view class="header-actions">
            <input class="input-sm" v-model="project_id" placeholder="项目ID" />
            <input class="input-sm" v-model="title" placeholder="标题" />
            <input class="input-sm" v-model="description" placeholder="描述" />
            <picker :range="priorities" range-key="label" @change="onPriority"><view class="picker-box">{{ priority || '优先级' }}</view></picker>
            <button class="btn-primary" @click="createTask">新建</button>
          </view>
        </view>

        <view class="card-body">
          <view class="grid">
            <view class="task-card" v-for="t in tasks" :key="t.id" @click="openDetail(t.id)">
              <text class="task-title">{{ t.title }}</text>
              <text class="task-meta">{{ t.status }} · {{ t.priority }}</text>
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
  components:{ Layout },
  data(){return{ tasks:[], project_id:'', title:'', description:'', priority:'', priorities:[{label:'low', value:'low'},{label:'medium', value:'medium'},{label:'high', value:'high'}] }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/tasks'); if(res.statusCode===200) this.tasks = res.data.data||[] },
    onPriority(e){ const idx = e.detail.value; this.priority = this.priorities[idx].value },
    async createTask(){ if(!this.project_id||!this.title){ uni.showToast({ title:'请填写必要信息', icon:'none' }); return }
      const res = await apiPost('/tasks', { project_id:this.project_id, title:this.title, description:this.description, priority:this.priority||'medium' })
      if(res.statusCode===200){ this.project_id=''; this.title=''; this.description=''; this.priority=''; this.fetch(); uni.showToast({ title:'已创建', icon:'success' }) }
    },
    openDetail(id){ uni.navigateTo({ url:`/pages/tasks/detail?id=${id}` }) },
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
.picker-box{ padding:12rpx; border-radius:8rpx; border:1rpx solid #e6e9ee }

.card-body{ padding:20rpx }
.grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:16rpx }
.task-card{ background:#fff; border-radius:10rpx; padding:16rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04) }
.task-title{ font-size:28rpx; color:#0f172a }
.task-meta{ color:#6b7280; margin-top:6rpx }

@media (max-width:640px){ .grid{ grid-template-columns: repeat(1, 1fr) } }
</style>
