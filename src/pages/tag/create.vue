<template>
  <view class="page">

    <view class="title">新建标签</view>

    <!-- 标签名称 -->
    <input
      class="input"
      v-model="name"
      placeholder="请输入标签名称"
    />

    <!-- 标签颜色 -->
    <view class="color-title">选择颜色：</view>
    <view class="color-list">
      <view
        v-for="(c, index) in colors"
        :key="index"
        class="color-box"
        :style="{ backgroundColor: c }"
        @click="selectColor(c)"
      >
        <view v-if="color === c" class="selected"></view>
      </view>
    </view>

    <button class="create-btn" @click="create">创建</button>

  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { createTag } from "@/api/tag.js";

const name = ref("");
const color = ref("");
const workspaceId = ref("");

// 推荐颜色组
const colors = [
  "#ff3b30",
  "#ff9500",
  "#ffcc00",
  "#34c759",
  "#5ac8fa",
  "#007aff",
  "#5856d6",
  "#af52de",
  "#8e8e93"
];

// 选择颜色
const selectColor = (c) => {
  color.value = c;
};

const create = async () => {
  if (!name.value) {
    uni.showToast({ title: "请输入名称", icon: "none" });
    return;
  }
  if (!color.value) {
    uni.showToast({ title: "请选择颜色", icon: "none" });
    return;
  }

  try {
    await createTag({
      name: name.value,
      color: color.value,
      workspace_id: workspaceId.value
    });

    uni.showToast({ title: "创建成功", icon: "success" });

    setTimeout(() => uni.navigateBack(), 500);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query ||
    {};
  workspaceId.value = query.workspaceId;
});
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
  margin-bottom: 20px;
}

.color-title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
}

.color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.color-box {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  position: relative;
}

.selected {
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 50%;
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