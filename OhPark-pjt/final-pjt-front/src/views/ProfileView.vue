<template>
  <div>
    <div :v-if="profile.id">
      <h1>{{ profile?.username }}님의 프로필</h1>
      <hr>
      <h3>작성한 게시물</h3>
      <p v-for="(article, index) in profile?.articles.reverse().slice(0, 3)" :key="index" >
        <a @click="gotoArticleDetail(article?.id)">
          {{ article?.title }}
        </a>
      </p>
      <hr>
      <h3>좋아요 누른 게시물</h3>
      <p v-for="(like_article, idx) in profile?.like_articles" :key="`o-${idx}`"
        @click="gotoArticleDetail(like_article?.id)"
      >
        {{ like_article?.title }}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  methods: {
    setProfile(username) {
      console.log("유저 이름", username)
      console.log()
      this.$store.dispatch('setProfile', username)
    },
    gotoArticleDetail(article_id) {
      this.$store.dispatch('getArticleDetail', article_id)
      this.$router.push({ name: 'ArticleDetailView', params: {article_id: article_id} })
    },
  },
  created() {
    this.username = this.$route.params.username
    this.setProfile(this.username)
  },
  computed: {
    profile() {
      return this.$store.getters.profile
    },
  },
  // mounted() {
  //   this.$store.commit('DELETE_ARTICLE')
  // }
}
</script>

<style>

</style>