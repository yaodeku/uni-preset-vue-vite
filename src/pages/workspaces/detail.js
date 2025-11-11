import { apiGet, apiPut } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components: { Layout },
  data(){return{ id:'', workspace:null }},
  async onLoad(q){ this.id=q.id; const res = await apiGet(`/workspaces/${this.id}`); if(res.statusCode===200) this.workspace=res.data.data },
  methods:{
    async save(){ const res = await apiPut(`/workspaces/${this.id}`, { name:this.workspace.name, description:this.workspace.description }); if(res.statusCode===200){ uni.showToast({ title:'已保存', icon:'success' }) } }
  }
}