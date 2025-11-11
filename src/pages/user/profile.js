import { apiGet, apiPut, apiPost } from '../../services/http.js'
import { getUserId, clearToken } from '../../utils/storage.js'
export default {
  data(){return{ full_name:'', display_name:'', bio:'' }},
  async onLoad(){
    const id = getUserId(); if(!id){ return }
    const res = await apiGet(`/user/profile/${id}`)
    if(res.statusCode===200 && res.data.status==='success'){
      const d = res.data.data || {}
      this.full_name=d.full_name||''; this.display_name=d.display_name||''; this.bio=d.bio||''
    }
  },
  methods:{
    async save(){
      const id = getUserId(); if(!id){ return }
      const res = await apiPut(`/user/profile/${id}`, { full_name:this.full_name, display_name:this.display_name, bio:this.bio })
      if(res.statusCode===200 && res.data.status==='success'){ uni.showToast({ title:'已保存', icon:'success' }) }
    },
    async logout(){
      await apiPost('/user/logout', {})
      clearToken();
      uni.reLaunch({ url:'/pages/auth/login' })
    }
  }
}