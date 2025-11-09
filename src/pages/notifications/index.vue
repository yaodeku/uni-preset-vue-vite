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

<script>
import { apiGet, apiPut, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ notifications:[] }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/notifications'); if(res.statusCode===200) this.notifications = res.data.data||[] },
    async markRead(id){ const res = await apiPut(`/notifications/${id}/read`, {}); if(res.statusCode===200) this.fetch() },
    async remove(id){ const res = await apiDelete(`/notifications/${id}`, {}); if(res.statusCode===200) this.fetch() },
  }
}
</script>

<style>
.page-root{ padding:24rpx }
.page-card{ background:#fff; border-radius:12rpx; box-shadow:0 8rpx 24rpx rgba(8,28,45,0.06); overflow:hidden }
.card-header{ padding:20rpx 24rpx; border-bottom:1rpx solid #f1f5f9 }
.page-title{ font-size:28rpx; color:#0f172a }
.card-body{ padding:20rpx }
.notifications-grid{ display:flex; flex-direction:column; gap:12rpx }
.notification-card{ background:#fff; border-radius:10rpx; padding:12rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04); display:flex; justify-content:space-between; align-items:center }
.notification-title{ font-size:26rpx; color:#0f172a }
.notification-body{ color:#6b7280 }
.notification-actions{ display:flex; gap:8rpx }
.btn-ghost{ background:transparent; border:1rpx solid #e6e9ee; padding:8rpx 10rpx; border-radius:8rpx }
.btn-danger{ background:#ef4444; color:#fff; padding:8rpx 10rpx; border-radius:8rpx }
</style>
