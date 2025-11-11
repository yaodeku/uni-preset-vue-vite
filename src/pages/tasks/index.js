import { apiGet, apiPost } from '../../services/http.js'
import Layout from '../../components/Layout.vue'

/**
 * 任务管理页面
 * 显示任务列表，支持创建新任务和查看详情
 */
export default {
  components: { 
    Layout 
  },
  
  data() {
    return { 
      tasks: [], 
      project_id: '', 
      title: '', 
      description: '', 
      priority: '', 
      priorities: [
        { label: 'low', value: 'low' },
        { label: 'medium', value: 'medium' },
        { label: 'high', value: 'high' }
      ] 
    }
  },
  
  onShow() { 
    this.fetch() 
  },
  
  methods: {
    /**
     * 获取任务列表
     */
    async fetch() { 
      const res = await apiGet('/tasks')
      if (res.statusCode === 200) {
        this.tasks = res.data.data || [] 
      }
    },
    
    /**
     * 处理优先级选择
     * @param {Object} e - 事件对象
     */
    onPriority(e) { 
      const idx = e.detail.value
      this.priority = this.priorities[idx].value 
    },
    
    /**
     * 创建新任务
     */
    async createTask() { 
      if (!this.project_id || !this.title) { 
        uni.showToast({ 
          title: '请填写必要信息', 
          icon: 'none' 
        })
        return 
      }
      
      const res = await apiPost('/tasks', { 
        project_id: this.project_id, 
        title: this.title, 
        description: this.description, 
        priority: this.priority || 'medium' 
      })
      
      if (res.statusCode === 200) { 
        this.project_id = ''
        this.title = ''
        this.description = ''
        this.priority = ''
        this.fetch()
        uni.showToast({ 
          title: '已创建', 
          icon: 'success' 
        }) 
      }
    },
    
    /**
     * 打开任务详情页面
     * @param {string} id - 任务ID
     */
    openDetail(id) { 
      uni.navigateTo({ 
        url: `/pages/tasks/detail?id=${id}` 
      }) 
    },
  }
}