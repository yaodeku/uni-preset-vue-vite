<template>
  <view class="screen-container">
    <text class="screen-title">评论</text>
    <view class="form-inline">
      <input class="text-input flex-1" v-model="resource_type" placeholder="资源类型(task/project)" />
      <input class="text-input flex-1" v-model="resource_id" placeholder="资源ID" />
    </view>
    <view class="form-inline">
      <input class="text-input flex-1" v-model="content" placeholder="输入评论内容" />
      <button class="primary-button" @click="createComment">发布</button>
    </view>
    <view class="list-container">
      <view class="list-item" v-for="c in comments" :key="c.id">
        <text class="item-title">{{ c.content }}</text>
        <text class="item-sub">{{ c.created_at }}</text>
        <view class="item-actions">
          <button size="mini" @click="startEdit(c)">编辑</button>
          <button size="mini" type="warn" @click="remove(c.id)">删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
export default {
  data(){return{ resource_type:'task', resource_id:'', content:'', comments:[], editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ if(!this.resource_type||!this.resource_id){ this.comments = []; return } const res = await apiGet('/comments', { resource_type:this.resource_type, resource_id:this.resource_id }); if(res.statusCode===200) this.comments = res.data.data||[] },
    async createComment(){ if(this.editId){ const r = await apiPut(`/comments/${this.editId}`, { content:this.content }); if(r.statusCode===200){ this.reset(); this.fetch() } return } const res = await apiPost('/comments', { resource_type:this.resource_type, resource_id:this.resource_id, content:this.content }); if(res.statusCode===200){ this.reset(); this.fetch() } },
    startEdit(c){ this.editId=c.id; this.content=c.content },
    reset(){ this.editId=''; this.content='' },
    async remove(id){ const res = await apiDelete(`/comments/${id}`, {}); if(res.statusCode===200) this.fetch() },
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
