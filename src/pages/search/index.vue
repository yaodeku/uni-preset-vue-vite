<template>
  <layout page-title="搜索">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">搜索</text>
          <view class="header-actions">
            <view class="tabs">
              <button :class="['tab-button', tab==='tasks'?'active':'']" @click="tab='tasks'">任务</button>
              <button :class="['tab-button', tab==='projects'?'active':'']" @click="tab='projects'">项目</button>
            </view>
          </view>
        </view>

        <view class="card-body">
          <view class="search-row">
            <input class="input-sm" v-model="query" placeholder="输入关键词" />
            <button class="btn-primary" @click="search">搜索</button>
          </view>

          <view v-if="tab==='tasks'" class="results-grid">
            <view class="result-card" v-for="t in taskResults" :key="t.id">
              <text class="result-title">{{ t.title }}</text>
              <text class="result-sub">{{ t.description }}</text>
            </view>
          </view>

          <view v-else class="results-grid">
            <view class="result-card" v-for="p in projectResults" :key="p.id">
              <text class="result-title">{{ p.title }}</text>
              <text class="result-sub">{{ p.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </layout>
</template>

<script>
import { apiGet } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
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
.page-root{ padding:24rpx }
.page-card{ background:#fff; border-radius:12rpx; box-shadow:0 8rpx 24rpx rgba(8,28,45,0.06); overflow:hidden }
.card-header{ display:flex; align-items:center; justify-content:space-between; padding:20rpx 24rpx; border-bottom:1rpx solid #f1f5f9 }
.page-title{ font-size:32rpx; color:#111827 }
.tabs{ display:flex; gap:12rpx }
.tab-button{ background-color:#f1f1f1; border-radius:6rpx; padding:8rpx 12rpx }
.active{ background-color:#2563eb; color:#fff }
.card-body{ padding:20rpx }
.search-row{ display:flex; gap:12rpx; margin-bottom:16rpx }
.input-sm{ padding:12rpx; border-radius:8rpx; border:1rpx solid #e6e9ee; flex:1 }
.btn-primary{ background:#2563eb; color:#fff; padding:10rpx 16rpx; border-radius:10rpx }
.results-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:16rpx }
.result-card{ background:#fff; border-radius:10rpx; padding:12rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04) }
.result-title{ font-size:26rpx; color:#0f172a }
.result-sub{ color:#6b7280 }

@media (max-width:640px){ .results-grid{ grid-template-columns: repeat(1, 1fr) } }
</style>
