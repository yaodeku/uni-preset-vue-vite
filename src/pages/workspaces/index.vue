<template>
  <layout page-title="工作空间">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">工作空间</text>
          <view class="header-actions">
            <input class="input-sm" v-model="name" placeholder="名称" />
            <input class="input-sm" v-model="description" placeholder="描述" />
            <button class="btn-primary" @click="createWorkspace">新建</button>
          </view>
        </view>

        <view class="card-body">
          <view class="grid">
            <view class="workspace-card" v-for="w in workspaces" :key="w.id">
              <view class="workspace-main" @click="openDetail(w.id)">
                <text class="workspace-title">{{ w.name }}</text>
                <text class="workspace-sub">{{ w.description }}</text>
              </view>
              <view class="workspace-actions">
                <button class="btn-ghost" @click.stop="edit(w)">编辑</button>
                <button class="btn-danger" @click.stop="remove(w.id)">删除</button>
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
  components: { Layout },
  data(){return{ workspaces:[], name:'', description:'', _editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/workspaces'); if(res.statusCode===200) this.workspaces = res.data.data||[] },
    async createWorkspace(){ if(!this.name){ uni.showToast({ title:'请填写名称', icon:'none' }); return }
      const payload = { name:this.name, description:this.description }
      const res = this._editId ? await apiPut(`/workspaces/${this._editId}`, payload) : await apiPost('/workspaces', payload)
      if(res.statusCode===200){ this.name=''; this.description=''; this._editId=''; this.fetch(); uni.showToast({ title:'已保存', icon:'success' }) }
    },
    edit(w){ this.name=w.name; this.description=w.description; this._editId=w.id },
    async remove(id){ const res = await apiDelete(`/workspaces/${id}`, {}); if(res.statusCode===200) { uni.showToast({ title:'已删除', icon:'success' }); this.fetch() } },
    async openDetail(id){ uni.navigateTo({ url:`/pages/workspaces/detail?id=${id}` }) },
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
.workspace-card{ background:#fff; border-radius:10rpx; padding:16rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04); display:flex; flex-direction:column; justify-content:space-between }
.workspace-main{ cursor:pointer }
.workspace-title{ font-size:28rpx; color:#0f172a }
.workspace-sub{ color:#6b7280; margin-top:6rpx }
.workspace-actions{ display:flex; gap:8rpx; margin-top:12rpx }
.btn-ghost{ background:transparent; border:1rpx solid #e6e9ee; padding:8rpx 10rpx; border-radius:8rpx }
.btn-danger{ background:#ef4444; color:#fff; padding:8rpx 10rpx; border-radius:8rpx }

@media (max-width:640px){ .grid{ grid-template-columns: repeat(1, 1fr) } }
</style>
