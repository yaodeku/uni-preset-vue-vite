import http from "./http.js";
// 让 AI 根据评论生成回复
export const aiReply = (taskId, content) => {
  return http.post(`/ai/reply`, {
    task_id: taskId,
    content
  });
};