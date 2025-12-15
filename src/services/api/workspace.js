// api/workspace.js
import { request } from '@/utils/request.js'

// 创建工作空间
export const createWorkspace = (data) => {
  return request('/workspace/create', 'POST', data)
}

// 获取当前用户的工作空间列表
export const getUserWorkspaces = () => {
  return request('/workspace/list', 'GET')
}

// 获取指定工作空间详情
export const getWorkspaceDetail = (workspaceId) => {
  return request(`/workspace/${workspaceId}`, 'GET')
}

// 更新工作空间信息
export const updateWorkspace = (workspaceId, data) => {
  return request(`/workspace/${workspaceId}`, 'PUT', data)
}

// 删除工作空间
export const deleteWorkspace = (workspaceId) => {
  return request(`/workspace/${workspaceId}`, 'DELETE')
}

// 添加成员到工作空间
export const addWorkspaceMember = (workspaceId, data) => {
  return request(`/workspace/${workspaceId}/member`, 'POST', data)
}

// 移除成员
export const removeWorkspaceMember = (workspaceId, userId) => {
  return request(`/workspace/${workspaceId}/member/${userId}`, 'DELETE')
}