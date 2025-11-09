<template>
  <view class="screen-container">
    <text class="screen-title">项目</text>
    <view class="form-inline">
      <input class="text-input flex-1" v-model="workspace_id" placeholder="工作空间ID" />
      <input class="text-input flex-1" v-model="title" placeholder="标题" />
      <input class="text-input flex-1" v-model="description" placeholder="描述" />
      <button class="primary-button" @click="createProject">新建</button>
    </view>
    <view class="list-container">
      <view class="list-item" v-for="p in projects" :key="p.id" @click="openDetail(p.id)">
        <text class="item-title">{{ p.title }}</text>
        <text class="item-sub">{{ p.description }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPost } from '../../services/http.js'
export default {
  data(){return{ projects:[], workspace_id:'', title:'', description:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/projects'); if(res.statusCode===200) this.projects = res.data.data||[] },
    async createProject(){ if(!this.workspace_id || !this.title){ return }
      const res = await apiPost('/projects', { workspace_id:this.workspace_id, title:this.title, description:this.description })
      if(res.statusCode===200){ this.workspace_id=''; this.title=''; this.description=''; this.fetch() }
    },
    openDetail(id){ uni.navigateTo({ url:`/pages/projects/detail?id=${id}` }) },
  }
}
</script>

<style>
.screen-container{ padding:24rpx }
.screen-title{ font-size:36rpx; color:#333; margin:24rpx 0 }
.form-inline{ display:flex; gap:12rpx; align-items:center; margin-bottom:16rpx }
.text-input{ border:1px solid #c8c7cc; border-radius:6rpx; padding:16rpx }
.flex-1{ flex:1 }
.primary-button{ background-color:#007aff; color:#fff; border-radius:6rpx; padding:16rpx }
.list-item{ border-bottom:1px solid #c8c7cc; padding: 16rpx 0 }
.item-title{ font-size:30rpx; color:#333 }
.item-sub{ color:#999; display:block }
</style>
