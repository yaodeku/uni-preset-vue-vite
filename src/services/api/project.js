// api/project.js
import { request } from '@/utils/request.js'

// 创建项目
export const createProject = (data) => {
  return request('/project/create', 'POST', data)
}

// 获取工作空间下的项目列表
export const getWorkspaceProjects = (workspaceId) => {
  return request(`/project/list/${workspaceId}`, 'GET')
}

// 获取项目详情
export const getProjectDetail = (projectId) => {
  return request(`/project/${projectId}`, 'GET')
}

// 更新项目
export const updateProject = (projectId, data) => {
  return request(`/project/${projectId}`, 'PUT', data)
}

// 删除项目
export const deleteProject = (projectId) => {
  return request(`/project/${projectId}`, 'DELETE')
}

// 添加成员
export const addProjectMember = (projectId, data) => {
  return request(`/project/${projectId}/member`, 'POST', data)
}

// 移除成员
export const removeProjectMember = (projectId, userId) => {
  return request(`/project/${projectId}/member/${userId}`, 'DELETE')
}