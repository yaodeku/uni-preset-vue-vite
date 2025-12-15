<template>
  <view class="page">

    <!-- 项目标题 -->
    <view class="header">
      <text class="title">{{ project.name }}</text>
      <text class="desc">{{ project.description || '暂无描述' }}</text>
      <text class="time">创建时间：{{ project.created_at }}</text>
    </view>

    <!-- 成员区域 -->
    <view class="section-title">成员</view>

    <view
      class="member-item"
      v-for="m in project.members"
      :key="m._id"
    >
      <text>{{ m.username }}（{{ m.email }}）</text>
    </view>

    <!-- 进入任务列表 -->
    <view class="btn" @click="goTasks">
      查看任务列表 →
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjectDetail } from '@/api/project.js'

const project = ref({})
const projectId = ref('')

// 加载项目详情
const loadDetail = async () => {
  const res = await getProjectDetail(projectId.value)
  project.value = res.data
}

// 跳转到任务列表
const goTasks = () => {
  uni.navigateTo({
    url: `/pages/task/list?projectId=${projectId.value}`
  })
}

onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query ||
    {}

  projectId.value = query.id
  loadDetail()
})
</script>

<style scoped>
.page {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 22px;
  font-weight: bold;
}

.desc {
  margin: 6px 0;
  color: #666;
}

.time {
  font-size: 12px;
  color: #999;
}

.section-title {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
}

.member-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.btn {
  margin-top: 20px;
  padding: 12px;
  background-color: #42b983;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}
</style>