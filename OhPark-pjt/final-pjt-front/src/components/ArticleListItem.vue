<template>
  <div class="articles">
    <div class="my-3 p-3 bg-white rounded box-shadow">
      <h6 class="border-bottom border-gray pb-2 mb-0">{{ article.title }} </h6>
      <div class="media text-muted pt-3">
        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="mr-2 rounded" width="32" height="32">
        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong class="d-block">{{ article.user_name }}</strong>
          <button class="btn" @click="goToArticleDetail">Detail</button>
        </p>
      </div>
    </div>
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
