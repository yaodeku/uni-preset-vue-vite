<template>
  <layout page-title="标签">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">标签</text>
          <view class="header-actions">
            <input class="input-sm" v-model="workspace_id" placeholder="工作空间ID" />
            <input class="input-sm" v-model="name" placeholder="名称" />
            <input class="input-sm" v-model="color" placeholder="#颜色" />
            <button class="btn-primary" @click="createTag">新建</button>
          </view>
        </view>

        <view class="card-body">
          <view class="tag-grid">
            <view class="tag-card" v-for="t in tags" :key="t.id">
              <view style="display:flex;align-items:center;gap:12rpx">
                <view :style="{width:'12rpx',height:'12rpx',borderRadius:'3rpx',background:t.color||'#e5e7eb'}"></view>
                <text class="tag-name">{{ t.name }}</text>
              </view>
              <view class="tag-actions">
                <button class="btn-ghost" @click.stop="startEdit(t)">编辑</button>
                <button class="btn-danger" @click.stop="remove(t.id)">删除</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </layout>
</template>

<script>
import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ tags:[], workspace_id:'', name:'', color:'', editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/tags'); if(res.statusCode===200) this.tags = res.data.data||[] },
    async createTag(){ if(this.editId){ const r = await apiPut(`/tags/${this.editId}`, { name:this.name, color:this.color }); if(r.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已更新', icon:'success' }) } return }
      const res = await apiPost('/tags', { workspace_id:this.workspace_id, name:this.name, color:this.color })
      if(res.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已创建', icon:'success' }) }
    },
    startEdit(t){ this.editId=t.id; this.name=t.name; this.color=t.color },
    reset(){ this.editId=''; this.workspace_id=''; this.name=''; this.color='' },
    async remove(id){ const res = await apiDelete(`/tags/${id}`, {}); if(res.statusCode===200) this.fetch() },
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
.tag-grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap:12rpx }
.tag-card{ background:#fff; border-radius:10rpx; padding:12rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04); display:flex; justify-content:space-between; align-items:center }
.tag-name{ font-size:24rpx; color:#0f172a }
.tag-actions{ display:flex; gap:8rpx }
.btn-ghost{ background:transparent; border:1rpx solid #e6e9ee; padding:8rpx 10rpx; border-radius:8rpx }
.btn-danger{ background:#ef4444; color:#fff; padding:8rpx 10rpx; border-radius:8rpx }

@media (max-width:640px){ .tag-grid{ grid-template-columns: repeat(2, 1fr) } }
</style>
