<template>
  <view class="screen-container">
    <text class="screen-title">附件 / 美术资产</text>
    <view class="form-inline wrap">
      <input class="text-input flex-1" v-model="attached_to_type" placeholder="关联类型(task/project)" />
      <input class="text-input flex-1" v-model="attached_to_id" placeholder="关联ID" />
      <input class="text-input flex-1" v-model="file_name" placeholder="文件名" />
      <input class="text-input flex-1" v-model="storage_key" placeholder="资源URL或存储键" />
      <input class="text-input flex-1" v-model="content_type" placeholder="MIME类型" />
      <input class="text-input flex-1" v-model.number="file_size" placeholder="文件大小(byte)" />
      <button class="primary-button" @click="upload">添加</button>
    </view>
    <view class="list-container">
      <view class="asset-item" v-for="a in attachments" :key="a.id">
        <image v-if="isImage(a.content_type)" :src="previewUrl(a)" class="asset-thumb" mode="aspectFill" />
        <view class="asset-info">
          <text class="item-title">{{ a.file_name }}</text>
          <text class="item-sub">{{ a.content_type }} · {{ a.file_size }}b</text>
          <navigator :url="previewUrl(a)" class="link">打开</navigator>
        </view>
        <button size="mini" type="warn" @click="remove(a.id)">删除</button>
      </view>
    </view>
  </view>
</template>

<script>
import { apiGet, apiPost, apiDelete } from '../../services/http.js'
export default {
  data(){return{ attached_to_type:'task', attached_to_id:'', file_name:'', storage_key:'', content_type:'image/png', file_size:0, attachments:[] }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/attachments'); if(res.statusCode===200) this.attachments = res.data.data||[] },
    async upload(){ if(!this.attached_to_id||!this.file_name||!this.storage_key){ return } const res = await apiPost('/attachments', { attached_to_type:this.attached_to_type, attached_to_id:this.attached_to_id, file_name:this.file_name, storage_key:this.storage_key, content_type:this.content_type, file_size:this.file_size||0 }); if(res.statusCode===200){ this.reset(); this.fetch() } },
    async remove(id){ const res = await apiDelete(`/attachments/${id}`, {}); if(res.statusCode===200) this.fetch() },
    previewUrl(a){ return a.storage_key },
    isImage(ct){ return (ct||'').startsWith('image/') },
    reset(){ this.file_name=''; this.storage_key=''; this.content_type='image/png'; this.file_size=0 }
  }
}
</script>

<style>
.screen-container{ padding:24rpx }
.screen-title{ font-size:36rpx; color:#333; margin:24rpx 0 }
.form-inline{ display:flex; gap:12rpx; align-items:center; margin-bottom:16rpx }
.wrap{ flex-wrap: wrap }
.text-input{ border:1px solid #c8c7cc; border-radius:6rpx; padding:16rpx }
.flex-1{ flex:1 }
.primary-button{ background-color:#007aff; color:#fff; border-radius:6rpx; padding:16rpx }
.asset-item{ display:flex; align-items:center; gap:12rpx; border-bottom:1px solid #c8c7cc; padding:16rpx 0 }
.asset-thumb{ width:120rpx; height:120rpx; border-radius:6rpx; background-color:#f8f8f8 }
.asset-info{ flex:1 }
.item-title{ font-size:30rpx; color:#333 }
.item-sub{ color:#999; display:block }
.link{ color:#007aff }
</style>
