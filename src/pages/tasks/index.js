import { apiGet, apiPost } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ tasks:[], project_id:'', title:'', description:'', priority:'', priorities:[{label:'low', value:'low'},{label:'medium', value:'medium'},{label:'high', value:'high'}] }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/tasks'); if(res.statusCode===200) this.tasks = res.data.data||[] },
    onPriority(e){ const idx = e.detail.value; this.priority = this.priorities[idx].value },
    async createTask(){ if(!this.project_id||!this.title){ uni.showToast({ title:'请填写必要信息', icon:'none' }); return }
      const res = await apiPost('/tasks', { project_id:this.project_id, title:this.title, description:this.description, priority:this.priority||'medium' })
      if(res.statusCode===200){ this.project_id=''; this.title=''; this.description=''; this.priority=''; this.fetch(); uni.showToast({ title:'已创建', icon:'success' }) }
    },
    openDetail(id){ uni.navigateTo({ url:`/pages/tasks/detail?id=${id}` }) },
  }
}