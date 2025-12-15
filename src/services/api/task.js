// api/task.js
import { request } from '@/utils/request.js'

// 创建任务
export const createTask = (data) => {
  return request('/task/create', 'POST', data)
}

// 获取项目下的任务列表
export const getProjectTasks = (projectId) => {
  return request(`/task/list/${projectId}`, 'GET')
}

// 获取任务详情
export const getTaskDetail = (taskId) => {
  return request(`/task/${taskId}`, 'GET')
}

// 更新任务
export const updateTask = (taskId, data) => {
  return request(`/task/${taskId}`, 'PUT', data)
}

// 删除任务
export const deleteTask = (taskId) => {
  return request(`/task/${taskId}`, 'DELETE')
}

// 修改任务状态
export const updateTaskStatus = (taskId, status) => {
  return request(`/task/${taskId}/status`, 'PUT', { status })
}

// 为任务添加成员
export const addTaskMember = (taskId, data) => {
  return request(`/task/${taskId}/member`, 'POST', data)
}

// 移除成员
export const removeTaskMember = (taskId, userId) => {
  return request(`/task/${taskId}/member/${userId}`, 'DELETE')
}