// api/ai.js
import { request } from '@/utils/request.js'

// AI 智能分类任务
export const aiClassifyTask = (data) => {
  return request('/ai/task/classify', 'POST', data)
}

// AI 生成评论
export const aiGenerateComment = (taskId, data) => {
  return request(`/ai/comment/${taskId}`, 'POST', data)
}

// AI 生成任务描述
export const aiGenerateTaskDescription = (data) => {
  return request('/ai/task/description', 'POST', data)
}