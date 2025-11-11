import Layout from '@/components/Layout.vue';

export default {
  components: {
    Layout
  },
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {
    goToRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      })
    }
  },
}