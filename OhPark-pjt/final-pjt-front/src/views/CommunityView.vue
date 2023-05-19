<template>
  <div>
    <h1>Community</h1>
    <router-link :to="{ name: 'ArticleCreateView'}">[CREATE]</router-link>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'

export default {
  name: 'CommunityView',
  components: {
    ArticleList,
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    getArticles() {
      if (this.isLogin) {
        this.$store.dispatch('getArticles')
      } else {
        alert('로그인을 해주세요')
        this.$router.push({ name: 'LoginView' })
      }
    }
  },
  created() {
    this.getArticles()

  },
}
</script>

<style>

</style>