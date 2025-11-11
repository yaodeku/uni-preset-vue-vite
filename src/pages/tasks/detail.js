import { apiGet, apiPut } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default { 
  components:{ Layout }, 
  data(){return{ id:'', task:null }},
  async onLoad(q){ 
    this.id=q.id; 
    const res = await apiGet(`/tasks/${this.id}`); 
    if(res.statusCode===200) this.task = res.data.data 
  }, 
  methods:{ 
    async save(){ 
      const { title, description, status, assignee_id } = this.task; 
      const res = await apiPut(`/tasks/${this.id}`, { title, description, status, assignee_id }); 
      if(res.statusCode===200){ 
        uni.showToast({ title:'已保存', icon:'success' }) 
      } 
    } 
  } 
}