<template>
  <view class="page">

    <view class="title">创建工作空间</view>

    <input
      class="input"
      v-model="name"
      placeholder="请输入工作空间名称"
    />

    <textarea
      class="textarea"
      v-model="description"
      placeholder="请输入描述（可选）"
    ></textarea>

    <button class="create-btn" @click="create">创建</button>

  </view>
</template>

<script setup>
import { ref } from 'vue'
import { createWorkspace } from '@/api/workspace.js'

const name = ref('')
const description = ref('')

const create = async () => {
  if (!name.value) {
    uni.showToast({ title: '请输入名称', icon: 'none' })
    return
  }

  try {
    await createWorkspace({
      name: name.value,
      description: description.value
    })

    uni.showToast({ title: '创建成功', icon: 'success' })

    setTimeout(() => {
      uni.navigateBack() // 返回 list.vue
    }, 500)

  } catch (err) {
    console.error('创建失败', err)
  }
}
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

.create-btn {
  width: 100%;
  background-color: #42b983;
  color: #fff;
  padding: 14px 0;
  border-radius: 6px;
  text-align: center;
}
</style>