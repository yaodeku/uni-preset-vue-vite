<template>
  <view class="page">

    <view class="header">
      <text class="title">{{ workspace.name }}</text>
      <text class="desc">{{ workspace.description || '暂无描述' }}</text>
      <text class="time">创建时间：{{ workspace.created_at }}</text>
    </view>

    <view class="section-title">成员列表</view>

    <view
      v-for="m in workspace.members"
      :key="m._id"
      class="member-item"
    >
      <text>{{ m.username }} （{{ m.email }}）</text>
    </view>

    <view class="section-title">项目列表</view>

    <view class="btn" @click="goProjects">查看项目 →</view>

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getWorkspaceDetail } from '@/api/workspace.js'

const workspace = ref({})
const workspaceId = ref('')

const loadDetail = async () => {
  const res = await getWorkspaceDetail(workspaceId.value)
  workspace.value = res.data
}

const goProjects = () => {
  uni.navigateTo({
    url: `/pages/project/list?workspaceId=${workspaceId.value}`
  })
}

onMounted(() => {
  const query = uni.getCurrentInstance().proxy.$route?.query
    || uni.getCurrentInstance().proxy.$mp?.query
    || {}

  workspaceId.value = query.id
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