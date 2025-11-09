<template>
  <layout page-title="评论">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">评论</text>
          <view class="header-actions">
            <input class="input-sm" v-model="resource_type" placeholder="资源类型 (task/project)" />
            <input class="input-sm" v-model="resource_id" placeholder="资源ID" />
          </view>
        </view>

        <view class="card-body">
          <view class="comment-input">
            <input class="input-control" v-model="content" placeholder="输入评论内容" />
            <button class="btn-primary" @click="createComment">发布</button>
          </view>

          <view class="comments-list">
            <view class="comment-card" v-for="c in comments" :key="c.id">
              <text class="comment-content">{{ c.content }}</text>
              <text class="comment-meta">{{ c.created_at }}</text>
              <view class="comment-actions">
                <button class="btn-ghost" @click="startEdit(c)">编辑</button>
                <button class="btn-danger" @click="remove(c.id)">删除</button>
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
  data(){return{ resource_type:'task', resource_id:'', content:'', comments:[], editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ if(!this.resource_type||!this.resource_id){ this.comments = []; return } const res = await apiGet('/comments', { resource_type:this.resource_type, resource_id:this.resource_id }); if(res.statusCode===200) this.comments = res.data.data||[] },
    async createComment(){ if(!this.resource_type||!this.resource_id||!this.content){ uni.showToast({ title:'请填写信息', icon:'none' }); return }
      if(this.editId){ const r = await apiPut(`/comments/${this.editId}`, { content:this.content }); if(r.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已更新', icon:'success' }) } return }
      const res = await apiPost('/comments', { resource_type:this.resource_type, resource_id:this.resource_id, content:this.content }); if(res.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已发布', icon:'success' }) } },
    startEdit(c){ this.editId=c.id; this.content=c.content },
    reset(){ this.editId=''; this.content='' },
    async remove(id){ const res = await apiDelete(`/comments/${id}`, {}); if(res.statusCode===200) this.fetch() },
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

.card-body{ padding:20rpx }
.comment-input{ display:flex; gap:12rpx; margin-bottom:16rpx }
.input-control{ flex:1; padding:12rpx; border-radius:8rpx; border:1rpx solid #e6e9ee }
.btn-primary{ background:#2563eb; color:#fff; padding:10rpx 16rpx; border-radius:10rpx }

.comments-list{ display:flex; flex-direction:column; gap:12rpx }
.comment-card{ background:#fff; border-radius:10rpx; padding:12rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04) }
.comment-content{ font-size:26rpx; color:#0f172a }
.comment-meta{ color:#6b7280; margin-top:6rpx }
.comment-actions{ display:flex; gap:8rpx; margin-top:8rpx }
.btn-ghost{ background:transparent; border:1rpx solid #e6e9ee; padding:8rpx 10rpx; border-radius:8rpx }
.btn-danger{ background:#ef4444; color:#fff; padding:8rpx 10rpx; border-radius:8rpx }
</style>
