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

<script src="./index.js">
</script>

<style src="./index.css">
</style>
