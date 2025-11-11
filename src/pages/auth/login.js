import { apiPost } from '../../services/http.js'
import { setToken, setUserId } from '../../utils/storage.js'
export default {
  data(){
    return { username:'', password:'', showPassword:false }
  },
  methods:{
    toggleShow(){ this.showPassword = !this.showPassword },
    async login(){
      if(!this.username||!this.password){ return uni.showToast({ title:'请填写用户名和密码', icon:'none' }) }
      try{
        const res = await apiPost('/user/login', { username:this.username, password:this.password })
        if(res.statusCode===200 && res.data.status==='success'){
          setToken(res.data.token); setUserId(res.data.user_id)
          uni.showToast({ title:'登录成功', icon:'success' })
          if(uni.switchTab) uni.switchTab({ url:'/pages/index/index' })
          else uni.reLaunch({ url:'/pages/index/index' })
        }else{
          uni.showToast({ title: res.data.message||'登录失败', icon:'none' })
        }
      }catch(e){ uni.showToast({ title:'网络或服务器错误', icon:'none' }) }
    }
  }
}