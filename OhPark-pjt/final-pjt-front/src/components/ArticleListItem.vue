<template>
  <div>
    <h5>{{ article.id }}</h5>
    <p>{{ article.title }}</p>
    <button @click="goToArticleDetail">[Detail]</button>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  methods: {
    goToArticleDetail() {
      this.$store.dispatch('getArticleDetail', this.article.id)
      this.$router.push({ name: 'ArticleDetailView', params: {article_id: this.article.id } })
    }
  }
}
</script>

<style>

</style>
