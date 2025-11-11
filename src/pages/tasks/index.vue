<template>
  <layout page-title="任务">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">任务</text>
          <view class="header-actions">
            <input class="input-sm" v-model="project_id" placeholder="项目ID" />
            <input class="input-sm" v-model="title" placeholder="标题" />
            <input class="input-sm" v-model="description" placeholder="描述" />
            <picker :range="priorities" range-key="label" @change="onPriority"><view class="picker-box">{{ priority || '优先级' }}</view></picker>
            <button class="btn-primary" @click="createTask">新建</button>
          </view>
        </view>

        <view class="card-body">
          <view class="grid">
            <view class="task-card" v-for="t in tasks" :key="t.id" @click="openDetail(t.id)">
              <text class="task-title">{{ t.title }}</text>
              <text class="task-meta">{{ t.status }} · {{ t.priority }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </layout>
</template>

<script src="./index.js">
</script>

<style src="./index.css">
</style>
