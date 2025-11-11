<template>
  <Layout page-title="附件">
    <view class="page-container">
      <view class="page-header">
        <text class="page-title">附件管理</text>
      </view>
      
      <view class="card-list">
        <view class="card" v-for="item in attachments" :key="item.id">
          <view class="card-body">
            <text class="card-title">{{ item.name }}</text>
            <text class="card-text">{{ item.description }}</text>
          </view>
          <view class="card-footer">
            <button class="btn-icon" @click="downloadAttachment(item)">下载</button>
            <button class="btn-icon" @click="deleteAttachment(item)">删除</button>
          </view>
        </view>
      </view>
    </view>
  </Layout>
</template>

<script src="./index.js">
</script>

<style src="./index.css">
</style>
