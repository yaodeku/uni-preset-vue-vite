&lt;template&gt;
  &lt;view class=&quot;register-container&quot;&gt;
    &lt;view class=&quot;register-box&quot;&gt;
      &lt;view class=&quot;title&quot;&gt;账号注册&lt;/view&gt;
      &lt;view class=&quot;form-item&quot;&gt;
        &lt;input 
          type=&quot;text&quot; 
          v-model=&quot;email&quot; 
          placeholder=&quot;请输入邮箱&quot;
          class=&quot;input&quot;
        /&gt;
      &lt;/view&gt;
      &lt;view class=&quot;form-item&quot;&gt;
        &lt;input 
          :type=&quot;showPassword ? 'text' : 'password'&quot; 
          v-model=&quot;password&quot; 
          placeholder=&quot;请输入密码&quot;
          class=&quot;input&quot;
        /&gt;
        &lt;text class=&quot;eye-icon&quot; @click=&quot;togglePassword&quot;&gt;
          {{ showPassword ? '👁️' : '👁️‍🗨️' }}
        &lt;/text&gt;
      &lt;/view&gt;
      &lt;view class=&quot;form-item&quot;&gt;
        &lt;input 
          :type=&quot;showPassword ? 'text' : 'password'&quot; 
          v-model=&quot;confirmPassword&quot; 
          placeholder=&quot;请确认密码&quot;
          class=&quot;input&quot;
        /&gt;
      &lt;/view&gt;
      &lt;button class=&quot;register-btn&quot; @click=&quot;handleRegister&quot;&gt;注册&lt;/button&gt;
      &lt;view class=&quot;login-link&quot; @click=&quot;goToLogin&quot;&gt;已有账号？立即登录&lt;/view&gt;
    &lt;/view&gt;
  &lt;/view&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    handleRegister() {
      if (!this.email || !this.password || !this.confirmPassword) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
      
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次密码不一致',
          icon: 'none'
        })
        return
      }
      
      // 这里添加注册逻辑
      uni.showToast({
        title: '注册成功',
        icon: 'success'
      })
    },
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    }
  }
}
&lt;/script&gt;

&lt;style lang=&quot;scss&quot; scoped&gt;
.register-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-box {
  width: 100%;
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 60rpx;
  text-align: center;
}

.form-item {
  position: relative;
  margin-bottom: 30rpx;
}

.input {
  width: 100%;
  height: 90rpx;
  background-color: #f8f8f8;
  border-radius: 45rpx;
  padding: 0 40rpx;
  font-size: 28rpx;
  color: #333;
  border: 2rpx solid transparent;
  box-sizing: border-box;
  
  &:focus {
    border-color: #007AFF;
    background-color: #ffffff;
  }
}

.eye-icon {
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40rpx;
  color: #999;
}

.register-btn {
  width: 100%;
  height: 90rpx;
  background-color: #007AFF;
  color: #ffffff;
  border-radius: 45rpx;
  font-size: 32rpx;
  margin-top: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:active {
    opacity: 0.8;
  }
}

.login-link {
  text-align: center;
  color: #007AFF;
  font-size: 28rpx;
  margin-top: 30rpx;
  
  &:active {
    opacity: 0.8;
  }
}
&lt;/style&gt;