import { apiGet, apiPut } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default { 
  components:{ Layout }, 
  data(){return{ id:'', project:null }},
  async onLoad(q){ 
    this.id=q.id; 
    const res = await apiGet(`/projects/${this.id}`); 
    if(res.statusCode===200) this.project = res.data.data 
  }, 
  methods:{ 
    async save(){ 
      const res = await apiPut(`/projects/${this.id}`, { title:this.project.title, description:this.project.description }); 
      if(res.statusCode===200){ 
        uni.showToast({ title:'已保存', icon:'success' }) 
      } 
    } 
  } 
}