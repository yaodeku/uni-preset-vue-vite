// api/comment.js
import { request } from '@/utils/request.js'

// 获取任务评论
export const getTaskComments = (taskId) => {
  return request(`/comment/list/${taskId}`, 'GET')
}

// 添加评论
export const addComment = (taskId, data) => {
  return request(`/comment/${taskId}`, 'POST', data)
}

// 删除评论
export const deleteComment = (commentId) => {
  return request(`/comment/${commentId}`, 'DELETE')
}