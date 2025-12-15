<template>
  <view class="page">

    <view class="header">
      <text class="title">项目列表</text>
      <button class="create-btn" @click="goCreate">+ 新建</button>
    </view>

    <view v-if="projects.length === 0" class="empty">
      该工作空间还没有项目，点击右上角创建一个吧～
    </view>

    <view
      class="project-item"
      v-for="p in projects"
      :key="p._id"
      @click="goDetail(p._id)"
    >
      <view class="p-name">{{ p.name }}</view>
      <view class="p-desc">{{ p.description || '暂无描述' }}</view>
      <view class="p-time">创建时间：{{ p.created_at }}</view>
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getWorkspaceProjects } from '@/api/project.js'

const projects = ref([])  
const workspaceId = ref('')

// 加载项目列表
const loadProjects = async () => {
  const res = await getWorkspaceProjects(workspaceId.value)
  projects.value = res.data
}

const goDetail = (id) => {
  uni.navigateTo({
    url: `/pages/project/detail?id=${id}`
  })
}

const goCreate = () => {
  uni.navigateTo({
    url: `/pages/project/create?workspaceId=${workspaceId.value}`
  })
}

onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query ||
    {}

  workspaceId.value = query.workspaceId
  loadProjects()
})
</script>

<style scoped>
.page {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.create-btn {
  background-color: #42b983;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
}

.project-item {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 14px;
}

.p-name {
  font-size: 20px;
  font-weight: bold;
}

.p-desc {
  margin: 6px 0;
  color: #666;
}

.p-time {
  font-size: 12px;
  color: #999;
}

.empty {
  margin-top: 40px;
  text-align: center;
  color: #888;
}
</style>