<template>
  <div>
    <h1>Detail</h1>
    <p>글 번호: {{ article?.id }}</p>
    <p>제목: {{ article?.title }}</p>
    <p>{{ article?.image }}</p>
    <p>내용 : {{ article?.content }}</p>
    <p>작성시간: {{ article?.created_at }}</p>
    <p>수정시간: {{ article?.updated_at }}</p>
  </div>
</template>

<script>

export default {
  name: 'ArticleDetailView',
  data() {
    return {
      article_id : this.$route.params.article_id
    }
  },
  computed: {
    article() {
      return this.$store.getters.article
    }
  },
  method: {
  },
}
</script>

<style>

</style>