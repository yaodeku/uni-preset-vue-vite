import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components: { Layout },
  data(){return{ workspaces:[], name:'', description:'', _editId:'' }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/workspaces'); if(res.statusCode===200) this.workspaces = res.data.data||[] },
    async createWorkspace(){ if(!this.name){ uni.showToast({ title:'请填写名称', icon:'none' }); return }
      const payload = { name:this.name, description:this.description }
      const res = this._editId ? await apiPut(`/workspaces/${this._editId}`, payload) : await apiPost('/workspaces', payload)
      if(res.statusCode===200){ this.name=''; this.description=''; this._editId=''; this.fetch(); uni.showToast({ title:'已保存', icon:'success' }) }
    },
    edit(w){ this.name=w.name; this.description=w.description; this._editId=w.id },
    async remove(id){ const res = await apiDelete(`/workspaces/${id}`, {}); if(res.statusCode===200) { uni.showToast({ title:'已删除', icon:'success' }); this.fetch() } },
    async openDetail(id){ uni.navigateTo({ url:`/pages/workspaces/detail?id=${id}` }) },
  }
}