<template>
  <view class="page">

    <view class="header">
      <text class="title">标签管理</text>
      <button class="create-btn" @click="goCreate">+ 新建标签</button>
    </view>

    <!-- 标签列表 -->
    <view v-if="tags.length > 0">
      <view class="tag-item" v-for="t in tags" :key="t._id">
        <view class="color-box" :style="{ backgroundColor: t.color }"></view>

        <view class="tag-info">
          <text class="tag-name">{{ t.name }}</text>
        </view>

        <view class="actions">
          <text class="edit" @click="goEdit(t._id)">编辑</text>
          <text class="delete" @click="remove(t._id)">删除</text>
        </view>
      </view>
    </view>

    <view v-else class="empty">
      当前工作空间还没有标签～
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getWorkspaceTags, deleteTag } from "@/api/tag.js";

const tags = ref([]);
const workspaceId = ref("");

// 加载标签
const loadTags = async () => {
  const res = await getWorkspaceTags(workspaceId.value);
  tags.value = res.data;
};

// 新建标签
const goCreate = () => {
  uni.navigateTo({
    url: `/pages/tag/create?workspaceId=${workspaceId.value}`
  });
};

// 编辑标签
const goEdit = (tagId) => {
  uni.navigateTo({
    url: `/pages/tag/edit?id=${tagId}&workspaceId=${workspaceId.value}`
  });
};

// 删除标签
const remove = (tagId) => {
  uni.showModal({
    title: "确认删除？",
    content: "删除后无法恢复",
    success: async (res) => {
      if (res.confirm) {
        await deleteTag(tagId);
        uni.showToast({ title: "删除成功", icon: "success" });
        loadTags();
      }
    }
  });
};

onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query ||
    {};

  workspaceId.value = query.workspaceId;
  loadTags();
});
</script>

<style scoped>
.page {
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.create-btn {
  background-color: #42b983;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
}

.tag-item {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.color-box {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 12px;
}

.tag-info {
  flex: 1;
}

.tag-name {
  font-size: 16px;
  color: #333;
}

.actions {
  display: flex;
  gap: 14px;
}

.edit {
  color: #007aff;
}

.delete {
  color: #ff3b30;
}

.empty {
  margin-top: 40px;
  text-align: center;
  color: #777;
}
</style>