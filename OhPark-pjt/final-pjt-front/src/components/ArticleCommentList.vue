<template>
  <div class="comment-list">
    <h4>댓글 목록</h4>
    <div v-if="comments">
      <p v-for="comment in comments" :key="comment.id">
        {{ comment.content }}
      </p>
    </div>
    <div v-else>
      <h6>댓글이 없습니다</h6>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ArticleCommentList',
  data() {
    return {
      comment: {
        content: null,
      }
    }
  },
  computed: {
    comments() {
      return this.$store.getters.comments
    }
  },
  methods: {
    getComments() {
      this.$store.dispatch('getComments')
    }
  },
  created() {
    this.getArticles()

  },
}
</script>

<style>
.article-list {
  text-align: start;
}
</style>
