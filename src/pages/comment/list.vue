<template>
  <view class="page">

    <!-- 评论列表 -->
    <view v-if="comments.length > 0">
      <view
        class="comment-item"
        :class="c.is_ai ? 'ai' : ''"
        v-for="c in comments"
        :key="c._id"
      >
        <image
          class="avatar"
          :src="c.is_ai ? aiAvatar : c.user?.avatar || defaultAvatar"
        ></image>

        <view class="content">
          <view class="top">
            <text class="username">
              {{ c.is_ai ? "AI 助手" : c.user?.username || "匿名用户" }}
            </text>
            <text class="time">{{ c.created_at }}</text>
          </view>

          <view class="text">{{ c.content }}</view>
        </view>
      </view>
    </view>

    <view v-else class="empty">
      还没有评论，快来留下第一条吧～
    </view>

    <!-- 底部输入框 -->
    <view class="input-bar">
      <input class="input" v-model="text" placeholder="写下你的评论..." />
      <button class="send-btn" @click="send">发送</button>
    </view>

  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getComments, addComment } from "@/api/comment.js";
import { aiReply } from "@/api/ai.js";

const comments = ref([]);
const taskId = ref("");
const text = ref("");

const defaultAvatar =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const aiAvatar =
  "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"; // AI 头像

// 加载评论
const loadComments = async () => {
  const res = await getComments(taskId.value);
  comments.value = res.data;
};

// 触发 AI 自动回复
const aiAutoReply = async (msg) => {
  try {
    await aiReply(taskId.value, msg);
  } catch (err) {
    console.log("AI 回复失败（可忽略）", err);
  }
};

// 发送评论
const send = async () => {
  if (!text.value) {
    uni.showToast({ title: "评论不能为空", icon: "none" });
    return;
  }

  await addComment(taskId.value, text.value);

  // ✨ 触发 AI 回复
  aiAutoReply(text.value);

  text.value = "";
  loadComments(); // 刷新列表
  uni.showToast({ title: "发送成功", icon: "success" });
};

onMounted(() => {
  const query =
    uni.getCurrentInstance().proxy.$route?.query ||
    uni.getCurrentInstance().proxy.$mp?.query ||
    {};
  taskId.value = query.taskId;
  loadComments();
});
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 80px;
}

.comment-item {
  display: flex;
  margin-bottom: 18px;
}

.comment-item.ai .username {
  color: #42b983;
}

.comment-item.ai .text {
  background: #f0fdf4;
  padding: 10px;
  border-radius: 6px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 12px;
}

.content {
  flex: 1;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.username {
  font-weight: bold;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
}

.text {
  line-height: 20px;
  color: #444;
}

.empty {
  margin-top: 40px;
  text-align: center;
  color: #777;
}

.input-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  border-top: 1px solid #ddd;
  background: #fff;
  padding: 8px;
  box-sizing: border-box;
}

.input {
  flex: 1;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 6px;
  margin-right: 10px;
}

.send-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
}
</style>