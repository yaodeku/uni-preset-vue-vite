export function getToken() {
  try { return uni.getStorageSync('auth_token') || null } catch (e) { return null }
}

export function setToken(token) {
  try { uni.setStorageSync('auth_token', token || '') } catch (e) {}
}

export function clearToken() {
  try { uni.removeStorageSync('auth_token') } catch (e) {}
}

export function getUserId() {
  try { return uni.getStorageSync('user_id') || null } catch (e) { return null }
}

export function setUserId(id) {
  try { uni.setStorageSync('user_id', id || '') } catch (e) {}
}
