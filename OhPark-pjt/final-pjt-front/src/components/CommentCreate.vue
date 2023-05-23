<template>
  <div>
    <h5>댓글 작성</h5>
    <form @submit.prevent="createComment">
      <label for="content">내용: </label>
      <input type="text" id="content" v-model="content"><br>
      <input type="submit" id="submit">
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
    createComment() {
      const payload = {
        content: this.content,
        article_id: this.$props.article_id
      }
      console.log(payload)
      this.$store.dispatch('createComment', payload)
        .then(() => {
          console.log('then 들어옴')
          this.$store.dispatch('getArticleDetail', payload.article_id)
        })
    },
  }
}
</script>

<style>

</style>