import { apiPost } from '../../services/http.js'
export default {
  data(){ return { username:'', email:'', password:'' } },
  methods:{
    async register(){
      if(!this.username||!this.email||!this.password){ return uni.showToast({ title:'请填写完整信息', icon:'none' }) }
      if(this.password.length<6){ return uni.showToast({ title:'请设置至少6位的密码', icon:'none' }) }
      try{
        const res = await apiPost('/user/register', { username:this.username, email:this.email, password:this.password })
        if(res.statusCode===200 && res.data.status==='success'){
          uni.showToast({ title:'注册成功', icon:'success' })
          uni.navigateTo({ url:'/pages/auth/login' })
        }else{
          uni.showToast({ title: res.data.message||'注册失败', icon:'none' })
        }
      }catch(e){ uni.showToast({ title:'网络或服务器错误', icon:'none' }) }
    }
  }
}