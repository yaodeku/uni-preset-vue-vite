import { apiGet, apiPut, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'
export default {
  components:{ Layout },
  data(){return{ notifications:[] }},
  onShow(){ this.fetch() },
  methods:{
    async fetch(){ const res = await apiGet('/notifications'); if(res.statusCode===200) this.notifications = res.data.data||[] },
    async markRead(id){ const res = await apiPut(`/notifications/${id}/read`, {}); if(res.statusCode===200) this.fetch() },
    async remove(id){ const res = await apiDelete(`/notifications/${id}`, {}); if(res.statusCode===200) this.fetch() },
  }
}