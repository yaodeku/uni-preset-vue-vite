<template>
  <view class="screen-container">
    <text class="screen-title">任务详情</text>
    <view v-if="task">
      <view class="form-field"><input class="text-input" v-model="task.title" placeholder="标题" /></view>
      <view class="form-field"><input class="text-input" v-model="task.description" placeholder="描述" /></view>
      <view class="form-field"><input class="text-input" v-model="task.status" placeholder="状态(backlog/in_progress/done)" /></view>
      <view class="form-field"><input class="text-input" v-model="task.assignee_id" placeholder="指派用户ID" /></view>
      <button class="primary-button" @click="save">保存</button>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPut } from '../../services/http.js'
export default { data(){return{ id:'', task:null }}, async onLoad(q){ this.id=q.id; const res = await apiGet(`/tasks/${this.id}`); if(res.statusCode===200) this.task = res.data.data }, methods:{ async save(){ const { title, description, status, assignee_id } = this.task; const res = await apiPut(`/tasks/${this.id}`, { title, description, status, assignee_id }); if(res.statusCode===200){ uni.showToast({ title:'已保存', icon:'success' }) } } } }
</script>

<style>
.screen-container{ padding:24rpx }
.screen-title{ font-size:36rpx; color:#333; margin:24rpx 0 }
.form-field{ margin: 12rpx 0 }
.text-input{ border:1px solid #c8c7cc; border-radius:6rpx; padding:16rpx }
.primary-button{ background-color:#007aff; color:#fff; border-radius:6rpx; padding:16rpx; margin-top:12rpx }
</style>
