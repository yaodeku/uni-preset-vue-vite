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

<script src="./detail.js">
</script>

<style src="./detail.css">
</style>
