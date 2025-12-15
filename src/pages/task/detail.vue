<template>
  <view class="page">

    <!-- 标题 -->
    <view class="header">
      <text class="title">{{ task.title }}</text>
      <text class="desc">{{ task.description || '暂无描述' }}</text>
    </view>

    <!-- 状态 -->
    <view class="section">
      <text class="label">状态：</text>
      <picker mode="selector" :range="statusOptions" @change="changeStatus">
        <view class="status-box">
          {{ statusText(task.status) }}
        </view>
      </picker>
    </view>

    <!-- 优先级 -->
    <view class="section">
      <text class="label">优先级：</text>
      <text>{{ task.priority || '无' }}</text>
    </view>

    <!-- 负责人 -->
    <view class="section">
      <text class="label">负责人：</text>
      <text>{{ task.owner?.username || '未指定' }}</text>
    </view>

    <!-- 成员 -->
    <view class="section">
      <text class="label">成员：</text>
      <view v-for="m in task.members" :key="m._id">
        {{ m.username }}（{{ m.email }}）
      </view>
    </view>

    <!-- 标签（K-4 整合） -->
    <view class="section">
      <text class="label">标签：</text>

      <view v-if="tags.length > 0" class="tag-list">
        <view
          class="tag-item"
          v-for="t in tags"
          :key="t._id"
          :style="{ backgroundColor: t.color }"
        >
          {{ t.name }}
        </view>
      </view>

      <view v-else>
        <text class="empty">暂无标签</text>
      </view>
    </view>

    <!-- 创建时间 -->
    <view class="section">
      <text class="label">创建时间：</text>
      <text>{{ task.created_at }}</text>
    </view>

    <!-- 评论 -->
    <view class="btn" @click="goComments">
      查看评论 →
    </view>

    <!-- 编辑任务 -->
    <view class="btn-edit" @click="goEdit">
      编辑任务
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTaskDetail, updateTaskStatus } from '@/api/task.js'
import { getTaskTags } from '@/api/tag.js'

const task = ref({})
const taskId = ref('')

// 任务标签
const tags = ref([])

// 状态选项
const statusOptions = ['todo', 'doing', 'done']

const loadDetail = async () => {
  const res = await getTaskDetail(taskId.value)
  task.value = res.data
}

const loadTags = async () => {
  const res = await getTaskTags(taskId.value)
  tags.value = res.data
}

// 修改任务状态
const changeStatus = async (e) => {
  const newStatus = statusOptions[e.detail.value]
  await updateTaskStatus(taskId.value, newStatus)

  uni.showToast({ title: '状态已更新', icon: 'success' })
  loadDetail()
}

const goComments = () => {
  uni.navigateTo({
    url: `/pages/comment/list?taskId=${taskId.value}`
  })
}

const goEdit = () => {
  uni.navigateTo({
    url: `/pages/task/edit?id=${taskId.value}`
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
  taskId.value = query.id

  loadDetail()
  loadTags()  // ★ 加载标签（整合 K-4）
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
  margin: 8px 0;
  color: #666;
}

.section {
  margin-bottom: 16px;
}

.label {
  font-weight: bold;
  margin-right: 6px;
}

.status-box {
  padding: 4px 10px;
  background-color: #eee;
  border-radius: 4px;
  display: inline-block;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.tag-item {
  padding: 4px 10px;
  color: white;
  border-radius: 6px;
  font-size: 14px;
}

.empty {
  color: #999;
}

.btn {
  background-color: #42b983;
  padding: 12px;
  color: white;
  text-align: center;
  border-radius: 6px;
  margin-top: 20px;
}

.btn-edit {
  background-color: #007AFF;
  padding: 12px;
  color: white;
  text-align: center;
  border-radius: 6px;
  margin-top: 12px;
}
</style>