<template>
  <view class="screen-container">
    <text class="screen-title">搜索</text>
    <view class="tabs">
      <button :class="['tab-button', tab==='tasks'?'active':'']" @click="tab='tasks'">任务</button>
      <button :class="['tab-button', tab==='projects'?'active':'']" @click="tab='projects'">项目</button>
    </view>
    <view class="form-inline">
      <input class="text-input flex-1" v-model="query" placeholder="输入关键词" />
      <button class="primary-button" @click="search">搜索</button>
    </view>
    <view v-if="tab==='tasks'">
      <view class="list-item" v-for="t in taskResults" :key="t.id">
        <text class="item-title">{{ t.title }}</text>
        <text class="item-sub">{{ t.description }}</text>
      </view>
    </view>
    <view v-else>
      <view class="list-item" v-for="p in projectResults" :key="p.id">
        <text class="item-title">{{ p.title }}</text>
        <text class="item-sub">{{ p.description }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet } from '../../services/http.js'
export default {
  data(){return{ tab:'tasks', query:'', taskResults:[], projectResults:[] }},
  methods:{
    async search(){ if(!this.query){ this.taskResults=[]; this.projectResults=[]; return }
      if(this.tab==='tasks'){ const r = await apiGet('/search/tasks', { query:this.query }); if(r.statusCode===200) this.taskResults=r.data.data||[] }
      else { const r = await apiGet('/search/projects', { query:this.query }); if(r.statusCode===200) this.projectResults=r.data.data||[] }
    }
  }
}
</script>

<style>
.screen-container{ padding:24rpx }
.screen-title{ font-size:36rpx; color:#333; margin:24rpx 0 }
.tabs{ display:flex; gap:12rpx; margin-bottom: 12rpx }
.tab-button{ background-color:#f1f1f1; border-radius:6rpx; padding:12rpx 16rpx }
.active{ background-color:#007aff; color:#fff }
.form-inline{ display:flex; gap:12rpx; align-items:center; margin-bottom:16rpx }
.text-input{ border:1px solid #c8c7cc; border-radius:6rpx; padding:16rpx }
.flex-1{ flex:1 }
.primary-button{ background-color:#007aff; color:#fff; border-radius:6rpx; padding:16rpx }
.list-item{ border-bottom:1px solid #c8c7cc; padding:16rpx 0 }
.item-title{ font-size:30rpx; color:#333 }
.item-sub{ color:#999; display:block }
</style>
