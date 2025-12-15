const BASE_URL = 'http://localhost:5173';

export const request = (url, method = 'GET', data = {}) => {
  const token = uni.getStorageSync('token'); // 从本地存储读 token

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      data: {
        time: new Date().toISOString(), // 统一要求：加 time 字段
        ...data,
      },
      header: {
        Authorization: token ? `Bearer ${token}` : '', // 自动注入 token
      },
      success: (res) => {
        // 统一处理 401 → 退登并跳登录
        if (res.statusCode === 401) {
          uni.removeStorageSync('token');
          uni.redirectTo({ url: '/pages/user/login' });
          return;
        }

        // 后端返回错误（status !== success）
        if (res.data.status !== 'success') {
          uni.showToast({
            title: res.data.message || '请求错误',
            icon: 'none',
          });

          reject(res.data); // 让调用方可以 catch
          return;
        }

        // 请求成功
        resolve(res.data);
      },

      fail: (error) => {
        uni.showToast({
          title: '网络连接失败',
          icon: 'none',
        });
        reject(error);
      },
    });
  });
};