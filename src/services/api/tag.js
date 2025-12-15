/import { request } from '@/utils/request.js'

// ==============================
// 标签（工作空间级别）
// ==============================

// 创建标签
export const createTag = (data) => {
  return request('/tag/create', 'POST', data)
}

// 获取某工作空间所有标签
export const getWorkspaceTags = (workspaceId) => {
  return request(`/tag/list/${workspaceId}`, 'GET')
}

// 更新标签
export const updateTag = (tagId, data) => {
  return request(`/tag/${tagId}`, 'PUT', data)
}

// 删除标签
export const deleteTag = (tagId) => {
  return request(`/tag/${tagId}`, 'DELETE')
}


// ==============================
// 标签（任务绑定部分）
// ==============================

// 获取某任务的所有标签
export const getTaskTags = (taskId) => {
  return request(`/task/${taskId}/tags`, 'GET')
}

// 设置任务的标签（传入 tagId 数组）
export const setTaskTags = (taskId, tagIds) => {
  return request(`/task/${taskId}/set-tags`, 'POST', {
    tags: tagIds
  })
}