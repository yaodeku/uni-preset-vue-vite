<template>
  <view class="screen-container">
    <text class="screen-title">任务</text>
    <view class="form-inline wrap">
      <input class="text-input flex-1" v-model="project_id" placeholder="项目ID" />
      <input class="text-input flex-1" v-model="title" placeholder="标题" />
      <input class="text-input flex-1" v-model="description" placeholder="描述" />
      <picker :range="priorities" range-key="label" @change="onPriority"><view class="picker-box">{{ priority || '优先级' }}</view></picker>
      <button class="primary-button" @click="createTask">新建</button>
    </view>
    <view class="list-container">
      <view class="list-item" v-for="t in tasks" :key="t.id" @click="openDetail(t.id)">
        <text class="item-title">{{ t.title }}</text>
        <text class="item-sub">{{ t.status }} · {{ t.priority }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPost } from '../../services/http.js'
export default {
  data(){return{ tasks:[], project_id:'', title:'', description:'', priority:'', priorities:[{label:'low', value:'low'},{label:'medium', value:'medium'},{label:'high', value:'high'}] }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/tasks'); if(res.statusCode===200) this.tasks = res.data.data||[] },
    onPriority(e){ const idx = e.detail.value; this.priority = this.priorities[idx].value },
    async createTask(){ if(!this.project_id||!this.title){ return }
      const res = await apiPost('/tasks', { project_id:this.project_id, title:this.title, description:this.description, priority:this.priority||'medium' })
      if(res.statusCode===200){ this.project_id=''; this.title=''; this.description=''; this.priority=''; this.fetch() }
    },
    openDetail(id){ uni.navigateTo({ url:`/pages/tasks/detail?id=${id}` }) },
  }
}
</script>

<style>
.screen-container{ padding:24rpx }
.screen-title{ font-size:36rpx; color:#333; margin:24rpx 0 }
.form-inline{ display:flex; gap:12rpx; align-items:center; margin-bottom:16rpx }
.wrap{ flex-wrap: wrap }
.text-input{ border:1px solid #c8c7cc; border-radius:6rpx; padding:16rpx }
.flex-1{ flex:1 }
.primary-button{ background-color:#007aff; color:#fff; border-radius:6rpx; padding:16rpx }
.picker-box{ border:1px solid #c8c7cc; border-radius:6rpx; padding:16rpx; color:#333 }
.list-item{ border-bottom:1px solid #c8c7cc; padding:16rpx 0 }
.item-title{ font-size:30rpx; color:#333 }
.item-sub{ color:#999; display:block }
</style>
