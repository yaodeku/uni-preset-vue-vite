import { API_BASE_URL, USE_MOCK_API } from '../config.js'
import { getToken } from '../utils/storage.js'
import { mockRequest } from './mock.js'

function buildUrl(path, params) {
  const url = new URL(path, API_BASE_URL)
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([k,v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
    })
  }
  return url.toString()
}

function baseBody() {
  const token = getToken()
  return { time: new Date().toISOString(), token: token || null }
}

export function request({ method='GET', path, data=null, params=null, headers={} }) {
  const url = buildUrl(path, params)
  const header = { 'Content-Type': 'application/json', ...headers }
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

export function apiGet(path, params) {
  return request({ method: 'GET', path, params })
}
export function apiPost(path, payload) {
  return request({ method: 'POST', path, data: { ...baseBody(), ...(payload||{}) } })
}
export function apiPut(path, payload) {
  return request({ method: 'PUT', path, data: { ...baseBody(), ...(payload||{}) } })
}
export function apiDelete(path, payload) {
  return request({ method: 'DELETE', path, data: { ...baseBody(), ...(payload||{}) } })
}
