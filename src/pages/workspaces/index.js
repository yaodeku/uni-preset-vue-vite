import { apiGet, apiPost, apiPut, apiDelete } from '../../services/http.js'
import Layout from '../../components/Layout.vue'

/**
 * 工作空间管理页面
 * 显示工作空间列表，支持创建、编辑、查看和删除工作空间
 */
export default {
  components: { 
    Layout 
  },
  
  data() {
    return { 
      workspaces: [], 
      name: '', 
      description: '', 
      _editId: '' 
    }
  },
  
  onShow() { 
    this.fetch() 
  },
  
  methods: {
    /**
     * 获取工作空间列表
     */
    async fetch() { 
      const res = await apiGet('/workspaces')
      if (res.statusCode === 200) {
        this.workspaces = res.data.data || [] 
      }
    },
    
    /**
     * 创建或更新工作空间
     * 如果处于编辑状态则更新工作空间，否则创建新工作空间
     */
    async createWorkspace() { 
      if (!this.name) { 
        uni.showToast({ 
          title: '请填写名称', 
          icon: 'none' 
        })
        return 
      }
      
      const payload = { 
        name: this.name, 
        description: this.description 
      }
      
      const res = this._editId ? 
        await apiPut(`/workspaces/${this._editId}`, payload) : 
        await apiPost('/workspaces', payload)
        
      if (res.statusCode === 200) { 
        this.name = ''
        this.description = ''
        this._editId = ''
        this.fetch()
        uni.showToast({ 
          title: '已保存', 
          icon: 'success' 
        }) 
      }
    },
    
    /**
     * 开始编辑工作空间
     * @param {Object} w - 工作空间对象
     */
    edit(w) { 
      this.name = w.name
      this.description = w.description
      this._editId = w.id 
    },
    
    /**
     * 删除工作空间
     * @param {string} id - 工作空间ID
     */
    async remove(id) { 
      const res = await apiDelete(`/workspaces/${id}`, {})
      if (res.statusCode === 200) { 
        uni.showToast({ 
          title: '已删除', 
          icon: 'success' 
        })
        this.fetch() 
      }
    },
    
    /**
     * 打开工作空间详情页面
     * @param {string} id - 工作空间ID
     */
    async openDetail(id) { 
      uni.navigateTo({ 
        url: `/pages/workspaces/detail?id=${id}` 
      }) 
    },
  }
}