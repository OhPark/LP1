<template>
  <div>
    <h1>Detail</h1>
    <p>작성자: {{ article?.user_name }}</p>
    <p>글 번호: {{ article?.id }}</p>
    <p>제목: {{ article?.title }}</p>
    <!-- <p>{{ article?.image }}</p> -->
    <p>내용 : {{ article?.content }}</p>
    <p>작성시간: {{ article?.created_at }}</p>
    <p>수정시간: {{ article?.updated_at }}</p>
    <hr>
    <ArticleCommentList />
    <hr>
    <CommentCreate />
    <hr>
    <button @click="deleteArticle">게시글 삭제</button>
    <button @click="gotoUpdateArticle">게시글 수정</button>
  </div>
</template>

<script>
import CommentCreate from '@/components/CommentCreate'
import ArticleCommentList from '@/components/ArticleCommentList'

export default {
  name: 'ArticleDetailView',
  components: {
    CommentCreate,
    ArticleCommentList,
  },
  data() {
    return {
      article_id : this.$route.params.article_id
    }
  },
  computed: {
    article() {
      return this.$store.getters.article
    },
  },
  methods: {
    deleteArticle () {
      this.$store.dispatch('deleteArticle', this.article.id)
      this.$store.dispatch('getArticles')
      this.$router.push({ name: 'CommunityView'})
    },
    gotoUpdateArticle() {
      this.$router.push({ name: 'ArticleUpdateView'})
    }
  },
}
</script>

<style>

</style>