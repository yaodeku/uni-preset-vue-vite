<template>
  <layout page-title="工作空间详情">
    <view class="page-root">
      <view class="page-card detail-card">
        <view class="card-header"><text class="page-title">工作空间详情</text></view>
        <view class="card-body" v-if="workspace">
          <view class="form-row"><label class="field-label">名称</label><input class="input-control" v-model="workspace.name" /></view>
          <view class="form-row"><label class="field-label">描述</label><input class="input-control" v-model="workspace.description" /></view>
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
