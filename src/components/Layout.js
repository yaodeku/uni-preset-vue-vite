/**
 * 应用布局组件
 * 提供统一的应用布局结构，包括侧边栏和页面标题
 */
export default {
  name: 'Layout',
  props: { 
    pageTitle: { 
      type: String, 
      default: '' 
    } 
  },
  data() {
    return {
      isSidebarCollapsed: false
    }
  },
  methods: {
    /**
     * 切换侧边栏展开/收起状态
     */
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
}