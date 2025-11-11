<template>
  <layout page-title="通知">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header"><text class="page-title">通知</text></view>
        <view class="card-body">
          <view class="notifications-grid">
            <view class="notification-card" v-for="n in notifications" :key="n.id">
              <view class="notification-main">
                <text class="notification-title">{{ n.title || '通知' }}</text>
                <text class="notification-body">{{ n.body }}</text>
              </view>
              <view class="notification-actions">
                <button class="btn-ghost" @click="markRead(n.id)" v-if="!n.is_read">标记已读</button>
                <button class="btn-danger" @click="remove(n.id)">删除</button>
              </view>
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
