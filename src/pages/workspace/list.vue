<template>
  <view class="page">

    <view class="header">
      <text class="title">我的工作空间</text>
      <button size="mini" type="primary" @click="goCreate">
        新建
      </button>
    </view>

    <!-- 工作空间列表 -->
    <view v-if="workspaceList.length > 0">
      <view
        v-for="w in workspaceList"
        :key="w._id"
        class="workspace-item"
        @click="goDetail(w._id)"
      >
        <view class="name">{{ w.name }}</view>
        <view class="desc">{{ w.description || '暂无描述' }}</view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty">
      <text>暂无工作空间</text>
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserWorkspaces } from '@/services/api/workspace.js'

const workspaceList = ref([])

/* 加载当前用户的工作空间 */
const loadWorkspaces = async () => {
  try {
    const res = await getUserWorkspaces()
    // 兼容不同后端返回结构
    workspaceList.value = res.data ?? res
  } catch (err) {
    console.error('获取工作空间失败', err)
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  }
}

/* 跳转到工作空间详情 */
const goDetail = (id) => {
  uni.navigateTo({
    url: `/pages/workspace/detail?id=${id}`
  })
}

/* 跳转到创建页面 */
const goCreate = () => {
  uni.navigateTo({
    url: '/pages/workspace/create'
  })
}

onMounted(() => {
  loadWorkspaces()
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
  font-size: 20px;
  font-weight: bold;
}

.workspace-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f7f7f7;
  margin-bottom: 12px;
}

.name {
  font-size: 16px;
  font-weight: bold;
}

.desc {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}

.empty {
  text-align: center;
  color: #999;
  margin-top: 60px;
}
</style>