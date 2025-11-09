<template>
  <layout page-title="附件 / 美术资产">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">附件 / 美术资产</text>
        </view>

        <view class="card-body">
          <view class="upload-row">
            <input class="input-sm" v-model="attached_to_type" placeholder="关联类型 (task/project)" />
            <input class="input-sm" v-model="attached_to_id" placeholder="关联ID" />
            <input class="input-sm" v-model="file_name" placeholder="文件名" />
            <input class="input-sm" v-model="storage_key" placeholder="资源URL或存储键" />
            <input class="input-sm" v-model="content_type" placeholder="MIME类型" />
            <input class="input-sm" v-model.number="file_size" placeholder="文件大小(byte)" />
            <button class="btn-primary" @click="upload">添加</button>
          </view>

          <view class="assets-grid">
            <view class="asset-card" v-for="a in attachments" :key="a.id">
              <image v-if="isImage(a.content_type)" :src="previewUrl(a)" class="asset-thumb" mode="aspectFill" />
              <view class="asset-info">
                <text class="item-title">{{ a.file_name }}</text>
                <text class="item-sub">{{ a.content_type }} · {{ a.file_size }}b</text>
                <navigator :url="previewUrl(a)" class="link">打开</navigator>
              </view>
              <button class="btn-danger" @click="remove(a.id)">删除</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </layout>
</template>

<script>
import { apiGet, apiPost, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ attached_to_type:'task', attached_to_id:'', file_name:'', storage_key:'', content_type:'image/png', file_size:0, attachments:[] }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/attachments'); if(res.statusCode===200) this.attachments = res.data.data||[] },
    async upload(){ if(!this.attached_to_id||!this.file_name||!this.storage_key){ uni.showToast({ title:'请填写信息', icon:'none' }); return } const res = await apiPost('/attachments', { attached_to_type:this.attached_to_type, attached_to_id:this.attached_to_id, file_name:this.file_name, storage_key:this.storage_key, content_type:this.content_type, file_size:this.file_size||0 }); if(res.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已添加', icon:'success' }) } },
    async remove(id){ const res = await apiDelete(`/attachments/${id}`, {}); if(res.statusCode===200) this.fetch() },
    previewUrl(a){ return a.storage_key },
    isImage(ct){ return (ct||'').startsWith('image/') },
    reset(){ this.file_name=''; this.storage_key=''; this.content_type='image/png'; this.file_size=0 }
  }
}
</script>

<style>
.page-root{ padding:24rpx }
.page-card{ background:#fff; border-radius:12rpx; box-shadow:0 8rpx 24rpx rgba(8,28,45,0.06); overflow:hidden }
.card-header{ padding:20rpx 24rpx; border-bottom:1rpx solid #f1f5f9 }
.page-title{ font-size:32rpx; color:#111827 }
.card-body{ padding:20rpx }
.upload-row{ display:flex; gap:12rpx; flex-wrap:wrap; margin-bottom:16rpx }
.input-sm{ padding:12rpx; border-radius:8rpx; border:1rpx solid #e6e9ee }
.btn-primary{ background:#2563eb; color:#fff; padding:10rpx 16rpx; border-radius:10rpx }

.assets-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap:16rpx }
.asset-card{ background:#fff; border-radius:10rpx; padding:12rpx; box-shadow:0 4rpx 12rpx rgba(8,28,45,0.04); display:flex; gap:12rpx; align-items:center }
.asset-thumb{ width:120rpx; height:120rpx; border-radius:8rpx; background:#f8f8f8 }
.asset-info{ flex:1 }
.item-title{ font-size:26rpx; color:#0f172a }
.item-sub{ color:#6b7280 }
.btn-danger{ background:#ef4444; color:#fff; padding:8rpx 10rpx; border-radius:8rpx }

@media (max-width:640px){ .assets-grid{ grid-template-columns: repeat(1, 1fr) } }
</style>
