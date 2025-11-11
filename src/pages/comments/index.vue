<template>
  <layout page-title="评论">
    <view class="page-root">
      <view class="page-card">
        <view class="card-header">
          <text class="page-title">评论</text>
          <view class="header-actions">
            <input class="input-sm" v-model="resource_type" placeholder="资源类型 (task/project)" />
            <input class="input-sm" v-model="resource_id" placeholder="资源ID" />
          </view>
        </view>

        <view class="card-body">
          <view class="comment-input">
            <input class="input-control" v-model="content" placeholder="输入评论内容" />
            <button class="btn-primary" @click="createComment">发布</button>
          </view>

          <view class="comments-list">
            <view class="comment-card" v-for="c in comments" :key="c.id">
              <text class="comment-content">{{ c.content }}</text>
              <text class="comment-meta">{{ c.created_at }}</text>
              <view class="comment-actions">
                <button class="btn-ghost" @click="startEdit(c)">编辑</button>
                <button class="btn-danger" @click="remove(c.id)">删除</button>
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
