import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ tags:[], workspace_id:'', name:'', color:'', editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/tags'); if(res.statusCode===200) this.tags = res.data.data||[] },
    async createTag(){ if(this.editId){ const r = await apiPut(`/tags/${this.editId}`, { name:this.name, color:this.color }); if(r.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已更新', icon:'success' }) } return }
      const res = await apiPost('/tags', { workspace_id:this.workspace_id, name:this.name, color:this.color })
      if(res.statusCode===200){ this.reset(); this.fetch(); uni.showToast({ title:'已创建', icon:'success' }) }
    },
    startEdit(t){ this.editId=t.id; this.name=t.name; this.color=t.color },
    reset(){ this.editId=''; this.workspace_id=''; this.name=''; this.color='' },
    async remove(id){ const res = await apiDelete(`/tags/${id}`, {}); if(res.statusCode===200) this.fetch() },
  }
}