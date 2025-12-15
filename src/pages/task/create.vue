<template>
  <view class="page">

    <view class="title">创建任务</view>

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
      placeholder="请输入任务描述（可选）"
    ></textarea>

    <!-- 优先级 -->
    <view class="picker-row">
      <text class="label">优先级：</text>
      <picker mode="selector" :range="priorityOptions" @change="selectPriority">
        <view class="picker-box">{{ priorityText }}</view>
      </picker>
    </view>

    <!-- 负责人（先简单文本输入） -->
    <input
      class="input"
      v-model="owner"
      placeholder="负责人用户名（可选）"
    />

    <!-- 创建按钮 -->
    <button class="create-btn" @click="create">创建</button>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createTask } from '@/api/task.js'

const title = ref('')
const description = ref('')
const priority = ref('')
const owner = ref('')
const projectId = ref('')

const priorityOptions = ['低', '中', '高']
const priorityValues = ['low', 'medium', 'high']
const priorityText = ref('请选择')

// 选择优先级
const selectPriority = (e) => {
  const idx = e.detail.value
  priority.value = priorityValues[idx]
  priorityText.value = priorityOptions[idx]
}

const create = async () => {
  if (!title.value) {
    uni.showToast({ title: '请输入任务标题', icon: 'none' })
    return
  }

  try {
    await createTask({
      title: title.value,
      description: description.value,
      priority: priority.value,
      owner: owner.value,
      project_id: projectId.value
    })

    uni.showToast({ title: '创建成功', icon: 'success' })

    setTimeout(() => {
      uni.navigateBack()
    }, 500)

  } catch (err) {
    console.error(err)
    uni.showToast({ title: '创建失败', icon: 'none' })
  }
}

onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query || {}

  projectId.value = query.projectId
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
}

.picker-box {
  background-color: #eee;
  padding: 10px;
  border-radius: 6px;
  margin-top: 6px;
}

.create-btn {
  width: 100%;
  background-color: #42b983;
  color: white;
  padding: 14px 0;
  border-radius: 6px;
  text-align: center;
}
</style>