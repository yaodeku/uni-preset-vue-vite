<template>
  <view class="screen-container">
    <text class="screen-title">通知</text>
    <view class="list-container">
      <view class="list-item" v-for="n in notifications" :key="n.id">
        <text class="item-title">{{ n.title }}</text>
        <text class="item-sub">{{ n.body }}</text>
        <view class="item-actions">
          <button size="mini" @click="markRead(n.id)" v-if="!n.is_read">标记已读</button>
          <button size="mini" type="warn" @click="remove(n.id)">删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPut, apiDelete } from '../../services/http.js'
export default {
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
.screen-container{ padding:24rpx }
.screen-title{ font-size:36rpx; color:#333; margin:24rpx 0 }
.list-item{ border-bottom:1px solid #c8c7cc; padding:16rpx 0 }
.item-title{ font-size:30rpx; color:#333 }
.item-sub{ color:#999; display:block }
.item-actions{ margin-top:8rpx; display:flex; gap:8rpx }
</style>
