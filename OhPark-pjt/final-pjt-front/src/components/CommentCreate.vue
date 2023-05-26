<template>
  <div>
    <h5>댓글 작성</h5>
    <form @submit.prevent="createComment">
      <label for="content"></label>
      <input type="text" id="content" v-model="content">
      <input class="btn btn-secondary btn-sm" type="submit" id="submit" value="제출">
    </form>
  </div>
</template>

<script>
export default {
  name: 'CommentCreate',
  props: {
    article_id: Number,
  },
  data() {
    return {
      content: null,
    }
  },
  methods: {
    async createComment() {
      const payload = {
        content: this.content,
        article_id: this.$props.article_id
      }
      console.log(payload)
      this.$store.dispatch('createComment', payload)   
      await setTimeout(() => {
        this.$store.dispatch('getArticleDetail', this.article_id)
        this.content = null
        }, 200)
    },
  }
}
</script>

<style>

</style>