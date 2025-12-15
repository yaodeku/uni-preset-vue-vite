<template>
  <view class="page">

    <view class="title">编辑任务</view>

    <!-- 标题 -->
    <input
      class="input"
      v-model="title"
      placeholder="请输入任务标题"
    />

    <!-- 描述 -->
    <textarea
      class="textarea"
      v-model="description"
      placeholder="请输入任务描述"
    ></textarea>

    <!-- 优先级 -->
    <view class="picker-row">
      <text class="label">优先级：</text>
      <picker mode="selector" :range="priorityOptions" @change="selectPriority">
        <view class="picker-box">{{ priorityText }}</view>
      </picker>
    </view>

    <!-- 负责人 -->
    <input
      class="input"
      v-model="owner"
      placeholder="负责人用户名（可选）"
    />

    <!-- 标签选择（K-5） -->
    <view class="section">
      <text class="label">标签：</text>

      <view class="tag-list">
        <view
          v-for="t in allTags"
          :key="t._id"
          class="tag-item"
          :class="{ active: selectedTagIds.includes(t._id) }"
          :style="tagStyle(t)"
          @click="toggleTag(t._id)"
        >
          {{ t.name }}
        </view>
      </view>
    </view>

    <!-- 保存 -->
    <button class="save-btn" @click="save">保存修改</button>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTaskDetail, updateTask } from '@/api/task.js'
import {
  getWorkspaceTags,
  getTaskTags,
  setTaskTags
} from '@/api/tag.js'

const taskId = ref('')
const workspaceId = ref('')

// 基本字段
const title = ref('')
const description = ref('')
const owner = ref('')

// 优先级
const priority = ref('')
const priorityOptions = ['低', '中', '高']
const priorityValues = ['low', 'medium', 'high']
const priorityText = ref('请选择')

// 标签相关
const allTags = ref([])          // 工作空间全部标签
const selectedTagIds = ref([])   // 当前任务选中的标签 ID

/* ========== 加载任务 ========== */
const loadTask = async () => {
  const res = await getTaskDetail(taskId.value)
  const t = res.data ?? res

  title.value = t.title
  description.value = t.description
  owner.value = t.owner?.username || ''

  if (t.priority) {
    const idx = priorityValues.indexOf(t.priority)
    if (idx >= 0) {
      priority.value = t.priority
      priorityText.value = priorityOptions[idx]
    }
  }
}

/* ========== 加载工作空间标签 ========== */
const loadAllTags = async () => {
  const res = await getWorkspaceTags(workspaceId.value)
  allTags.value = res.data ?? res
}

/* ========== 加载任务已绑定标签 ========== */
const loadTaskTags = async () => {
  const res = await getTaskTags(taskId.value)
  const list = res.data ?? res
  selectedTagIds.value = list.map(t => t._id)
}

/* ========== 选择优先级 ========== */
const selectPriority = (e) => {
  const idx = e.detail.value
  priority.value = priorityValues[idx]
  priorityText.value = priorityOptions[idx]
}

/* ========== 切换标签选中 ========== */
const toggleTag = (id) => {
  const idx = selectedTagIds.value.indexOf(id)
  if (idx >= 0) {
    selectedTagIds.value.splice(idx, 1)
  } else {
    selectedTagIds.value.push(id)
  }
}

/* ========== 标签样式 ========== */
const tagStyle = (tag) => {
  if (selectedTagIds.value.includes(tag._id)) {
    return {
      backgroundColor: tag.color,
      color: '#fff'
    }
  }
  return {
    border: `1px solid ${tag.color}`,
    color: tag.color
  }
}

/* ========== 保存 ========== */
const save = async () => {
  if (!title.value) {
    uni.showToast({ title: '标题不能为空', icon: 'none' })
    return
  }

  try {
    // 1. 更新任务基本信息
    await updateTask(taskId.value, {
      title: title.value,
      description: description.value,
      priority: priority.value,
      owner: owner.value
    })

    // 2. 绑定任务标签（K-5 核心）
    await setTaskTags(taskId.value, selectedTagIds.value)

    uni.showToast({ title: '保存成功', icon: 'success' })

    setTimeout(() => {
      uni.navigateBack()
    }, 500)

  } catch (err) {
    console.error(err)
    uni.showToast({ title: '保存失败', icon: 'none' })
  }
}

/* ========== 初始化 ========== */
onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query ||
    {}

  taskId.value = query.id
  workspaceId.value = query.workspaceId

  loadTask()
  loadAllTags()
  loadTaskTags()
})
</script>

<style scoped>
.page {
  padding: 20px;
}

.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.textarea {
  width: 100%;
  height: 120px;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.picker-row {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;
  display: block;
}

.picker-box {
  background-color: #eee;
  padding: 10px;
  border-radius: 6px;
}

.section {
  margin-bottom: 20px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  padding: 6px 12px;
  border-radius: 14px;
  font-size: 14px;
}

.tag-item.active {
  font-weight: bold;
}

.save-btn {
  width: 100%;
  background-color: #007AFF;
  color: white;
  padding: 14px 0;
  border-radius: 6px;
}
</style>