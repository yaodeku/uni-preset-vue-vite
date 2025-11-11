import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ resource_type:'task', resource_id:'', content:'', comments:[], editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ if(!this.resource_type||!this.resource_id){ this.comments = []; return } const res = await apiGet('/comments', { resource_type:this.resource_type, resource_id:this.resource_id }); if(res.statusCode===200) this.comments = res.data.data||[] },
    async createComment(){ if(!this.resource_type||!this.resource_id||!this.content){ uni.showToast({ title:'请填写信息', icon:'none' }); return }
      if(this.editId){ const r = await apiPut(`/comments/${this.editId}`, { content:this.content }); if(r.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已更新', icon:'success' }) } return }
      const res = await apiPost('/comments', { resource_type:this.resource_type, resource_id:this.resource_id, content:this.content }); if(res.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已发布', icon:'success' }) } },
    startEdit(c){ this.editId=c.id; this.content=c.content },
    reset(){ this.editId=''; this.content='' },
    async remove(id){ const res = await apiDelete(`/comments/${id}`, {}); if(res.statusCode===200) this.fetch() },
  }
}