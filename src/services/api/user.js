// api/user.js
import { request } from '@/utils/request.js';

// 用户注册
export const register = (data) => {
  return request('/user/register', 'POST', data);
};

// 用户登录
export const login = (email, password) => {
  return request('/user/login', 'POST', { email, password });
};

// 用户登出
export const logout = () => {
  return request('/user/logout', 'POST');
};

// 获取个人资料
export const getProfile = (userId) => {
  return request(`/user/profile/${userId}`, 'GET');
};

// 更新个人资料
export const updateProfile = (userId, data) => {
  return request(`/user/profile/${userId}`, 'PUT', data);
};

// 删除账号
export const deleteAccount = (userId) => {
  return request(`/user/profile/${userId}`, 'DELETE');
};
