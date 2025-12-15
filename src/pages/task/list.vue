<template>
  <view class="page">

    <view class="header">
      <text class="title">任务列表</text>
      <button class="create-btn" @click="goCreate">+ 新建</button>
    </view>

    <!-- 没有任务时 -->
    <view v-if="taskList.length === 0" class="empty">
      还没有任务，点击右上角创建一个吧～
    </view>

    <!-- 任务列表 -->
    <view
      class="task-item"
      v-for="t in taskList"
      :key="t._id"
      @click="goDetail(t._id)"
    >
      <view class="task-top">
        <text class="task-title">{{ t.title }}</text>
        <text class="task-status" :class="t.status">{{ statusText(t.status) }}</text>
      </view>

      <view class="task-info">
        <text class="info-text">优先级：{{ t.priority || '无' }}</text>
        <text class="info-text">负责人：{{ t.owner?.username || '未指定' }}</text>
      </view>

      <view class="task-time">
        创建时间：{{ t.created_at }}
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjectTasks } from '@/api/task.js'

const projectId = ref('')
const taskList = ref([])

const loadTasks = async () => {
  const res = await getProjectTasks(projectId.value)
  taskList.value = res.data
}

const goDetail = (taskId) => {
  uni.navigateTo({
    url: `/pages/task/detail?id=${taskId}`
  })
}

const goCreate = () => {
  uni.navigateTo({
    url: `/pages/task/create?projectId=${projectId.value}`
  })
}

const statusText = (status) => {
  switch (status) {
    case 'todo': return '待处理'
    case 'doing': return '进行中'
    case 'done': return '已完成'
    default: return '未知'
  }
}

onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query ||
    {}
  projectId.value = query.projectId
  loadTasks()
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

.task-item {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 14px;
}

.task-top {
  display: flex;
  justify-content: space-between;
}

.task-title {
  font-size: 18px;
  font-weight: bold;
}

.task-status {
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
}

.task-status.todo {
  background-color: #888;
}

.task-status.doing {
  background-color: #007AFF;
}

.task-status.done {
  background-color: #42b983;
}

.task-info {
  margin: 10px 0;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.task-time {
  font-size: 12px;
  color: #999;
}

.empty {
  margin-top: 40px;
  text-align: center;
  color: #888;
}
</style>