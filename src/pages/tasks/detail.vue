<template>
  <layout page-title="任务详情">
    <view class="page-root">
      <view class="page-card detail-card">
        <view class="card-header"><text class="page-title">任务详情</text></view>
        <view class="card-body" v-if="task">
          <view class="form-row"><label class="field-label">标题</label><input class="input-control" v-model="task.title" /></view>
          <view class="form-row"><label class="field-label">描述</label><input class="input-control" v-model="task.description" /></view>
          <view class="form-row"><label class="field-label">状态</label><input class="input-control" v-model="task.status" placeholder="backlog/in_progress/done" /></view>
          <view class="form-row"><label class="field-label">指派用户ID</label><input class="input-control" v-model="task.assignee_id" /></view>
          <button class="btn-primary" @click="save">保存</button>
        </view>
      </view>
    </view>
  </layout>
</template>

<script>
import { apiGet, apiPut } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default { components:{ Layout }, data(){return{ id:'', task:null }}, async onLoad(q){ this.id=q.id; const res = await apiGet(`/tasks/${this.id}`); if(res.statusCode===200) this.task = res.data.data }, methods:{ async save(){ const { title, description, status, assignee_id } = this.task; const res = await apiPut(`/tasks/${this.id}`, { title, description, status, assignee_id }); if(res.statusCode===200){ uni.showToast({ title:'已保存', icon:'success' }) } } } }
</script>

<style>
.page-root{ padding:24rpx }
.page-card{ background:#fff; border-radius:12rpx; box-shadow:0 8rpx 24rpx rgba(8,28,45,0.06); overflow:hidden }
.card-header{ padding:20rpx 24rpx; border-bottom:1rpx solid #f1f5f9 }
.page-title{ font-size:28rpx; color:#0f172a }
.card-body{ padding:20rpx }
.form-row{ margin-bottom:12rpx }
.field-label{ font-size:24rpx; color:#374151; margin-bottom:6rpx }
.input-control{ width:100%; padding:12rpx; border-radius:8rpx; border:1rpx solid #e6e9ee }
.btn-primary{ margin-top:12rpx; background:#2563eb; color:#fff; padding:12rpx; border-radius:8rpx }
</style>
