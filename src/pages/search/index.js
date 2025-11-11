import { apiGet } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ tab:'tasks', query:'', taskResults:[], projectResults:[] }},
  methods:{
    async search(){ if(!this.query){ this.taskResults=[]; this.projectResults=[]; return }
      if(this.tab==='tasks'){ const r = await apiGet('/search/tasks', { query:this.query }); if(r.statusCode===200) this.taskResults=r.data.data||[] }
      else { const r = await apiGet('/search/projects', { query:this.query }); if(r.statusCode===200) this.projectResults=r.data.data||[] }
    }
  }
}