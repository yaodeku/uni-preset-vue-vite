<template>
  <Layout page-title="评论">
    <view class="page-container">
      <view class="page-header">
        <text class="page-title">评论管理</text>
      </view>
      
      <view class="card-list">
        <view class="card" v-for="item in comments" :key="item.id">
          <view class="card-body">
            <text class="card-title">{{ item.content }}</text>
            <text class="card-text">用户: {{ item.user_name }}</text>
          </view>
          <view class="card-footer">
            <button class="btn-icon" @click="editComment(item)">编辑</button>
            <button class="btn-icon" @click="deleteComment(item)">删除</button>
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
