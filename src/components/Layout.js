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
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
}