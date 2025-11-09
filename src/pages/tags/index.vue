<template>
  <view class="screen-container">
    <text class="screen-title">标签</text>
    <view class="form-inline">
      <input class="text-input flex-1" v-model="workspace_id" placeholder="工作空间ID" />
      <input class="text-input flex-1" v-model="name" placeholder="名称" />
      <input class="text-input flex-1" v-model="color" placeholder="#颜色" />
      <button class="primary-button" @click="createTag">新建</button>
    </view>
    <view class="list-container">
      <view class="list-item" v-for="t in tags" :key="t.id">
        <text class="item-title">{{ t.name }}</text>
        <text class="item-sub">{{ t.color }}</text>
        <view class="item-actions">
          <button size="mini" @click="startEdit(t)">编辑</button>
          <button size="mini" type="warn" @click="remove(t.id)">删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
export default {
  data(){return{ tags:[], workspace_id:'', name:'', color:'', editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/tags'); if(res.statusCode===200) this.tags = res.data.data||[] },
    async createTag(){ if(this.editId){ const r = await apiPut(`/tags/${this.editId}`, { name:this.name, color:this.color }); if(r.statusCode===200){ this.reset(); this.fetch() } return }
      const res = await apiPost('/tags', { workspace_id:this.workspace_id, name:this.name, color:this.color })
      if(res.statusCode===200){ this.reset(); this.fetch() }
    },
    startEdit(t){ this.editId=t.id; this.name=t.name; this.color=t.color },
    reset(){ this.editId=''; this.workspace_id=''; this.name=''; this.color='' },
    async remove(id){ const res = await apiDelete(`/tags/${id}`, {}); if(res.statusCode===200) this.fetch() },
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
.list-item{ border-bottom:1px solid #c8c7cc; padding:16rpx 0 }
.item-title{ font-size:30rpx; color:#333 }
.item-sub{ color:#999; display:block }
.item-actions{ margin-top:8rpx; display:flex; gap:8rpx }
</style>
