import { API_BASE_URL, USE_MOCK_API } from '../config.js'
import { getToken } from '../utils/storage.js'
import { mockRequest } from './mock.js'

/**
 * 构建完整的URL地址
 * @param {string} path - API路径
 * @param {Object} params - URL参数
 * @returns {string} 完整的URL地址
 */
function buildUrl(path, params) {
  const url = new URL(path, API_BASE_URL)
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, v)
      }
    })
  }
  return url.toString()
}

/**
 * 构建基础请求体
 * @returns {Object} 包含时间戳和token的基础请求体
 */
function baseBody() {
  const token = getToken()
  return { 
    time: new Date().toISOString(), 
    token: token || null 
  }
}

/**
 * 发送HTTP请求的通用方法
 * @param {Object} options - 请求选项
 * @param {string} options.method - HTTP方法
 * @param {string} options.path - API路径
 * @param {Object} options.data - 请求数据
 * @param {Object} options.params - URL参数
 * @param {Object} options.headers - 请求头
 * @returns {Promise} 请求Promise
 */
export function request({ method = 'GET', path, data = null, params = null, headers = {} }) {
  const url = buildUrl(path, params)
  const header = { 
    'Content-Type': 'application/json', 
    ...headers 
  }
  
  if (USE_MOCK_API) {
    return mockRequest({ method, url, data, header })
  }
  
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      header,
      data,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

/**
 * 发送GET请求
 * @param {string} path - API路径
 * @param {Object} params - URL参数
 * @returns {Promise} 请求Promise
 */
export function apiGet(path, params) {
  return request({ 
    method: 'GET', 
    path, 
    params 
  })
}

/**
 * 发送POST请求
 * @param {string} path - API路径
 * @param {Object} payload - 请求数据
 * @returns {Promise} 请求Promise
 */
export function apiPost(path, payload) {
  return request({ 
    method: 'POST', 
    path, 
    data: { 
      ...baseBody(), 
      ...(payload || {}) 
    } 
  })
}

/**
 * 发送PUT请求
 * @param {string} path - API路径
 * @param {Object} payload - 请求数据
 * @returns {Promise} 请求Promise
 */
export function apiPut(path, payload) {
  return request({ 
    method: 'PUT', 
    path, 
    data: { 
      ...baseBody(), 
      ...(payload || {}) 
    } 
  })
}

/**
 * 发送DELETE请求
 * @param {string} path - API路径
 * @param {Object} payload - 请求数据
 * @returns {Promise} 请求Promise
 */
export function apiDelete(path, payload) {
  return request({ 
    method: 'DELETE', 
    path, 
    data: { 
      ...baseBody(), 
      ...(payload || {}) 
    } 
  })
}