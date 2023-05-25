<template>
  <div class="article-list">
    <div v-if="articles">
      <ArticleListItem 
      v-for="article in articles" :key="article.id" :article="article"
      />
    </div>
    <div v-else>
      <h2>아무런 게시글이 존재하지 않습니다.</h2>
    </div>

  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem,
  },
  computed: {
    articles() {
      return this.$store.getters.articles
    }
  }
}
</script>

<style>
.article-list {
  text-align: center;
  
}
</style>