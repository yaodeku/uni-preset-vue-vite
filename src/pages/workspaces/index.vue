<template>
  <view class="screen-container">
    <text class="screen-title">工作空间</text>
    <view class="form-inline">
      <input class="text-input flex-1" v-model="name" placeholder="名称" />
      <input class="text-input flex-1" v-model="description" placeholder="描述" />
      <button class="primary-button" @click="createWorkspace">新建</button>
    </view>
    <view class="list-container">
      <view class="list-item" v-for="w in workspaces" :key="w.id" @click="openDetail(w.id)">
        <text class="item-title">{{ w.name }}</text>
        <text class="item-sub">{{ w.description }}</text>
        <view class="item-actions">
          <button size="mini" @click.stop="edit(w)">编辑</button>
          <button size="mini" type="warn" @click.stop="remove(w.id)">删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
export default {
  data(){return{ workspaces:[], name:'', description:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/workspaces'); if(res.statusCode===200) this.workspaces = res.data.data||[] },
    async createWorkspace(){ if(!this.name){ return }
      const res = await apiPost('/workspaces', { name:this.name, description:this.description })
      if(res.statusCode===200){ this.name=''; this.description=''; this.fetch() }
    },
    edit(w){ this.name=w.name; this.description=w.description; this._editId=w.id },
    async remove(id){ const res = await apiDelete(`/workspaces/${id}`, {}); if(res.statusCode===200) this.fetch() },
    async openDetail(id){ uni.navigateTo({ url:`/pages/workspaces/detail?id=${id}` }) },
  }
}
</script>

<style>
.screen-container{ padding: 24rpx }
.screen-title{ font-size: 36rpx; color:#333; margin: 24rpx 0 }
.form-inline{ display:flex; gap: 12rpx; align-items: center; margin-bottom: 16rpx }
.text-input{ border:1px solid #c8c7cc; border-radius:6rpx; padding: 16rpx }
.flex-1{ flex:1 }
.primary-button{ background-color:#007aff; color:#fff; border-radius:6rpx; padding: 16rpx }
.list-container{ }
.list-item{ border-bottom:1px solid #c8c7cc; padding: 16rpx 0 }
.item-title{ font-size: 30rpx; color:#333 }
.item-sub{ color:#999; display:block }
.item-actions{ margin-top: 8rpx; display:flex; gap: 8rpx }
</style>
