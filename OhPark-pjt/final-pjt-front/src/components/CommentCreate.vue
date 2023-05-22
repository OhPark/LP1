<template>
  <div>
    <h5>댓글 작성</h5>
    <form @submit.prevent="createComment">
      <label for="content">내용: </label>
      <input type="text" id="content" v-model.trim="comment.content"><br>
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'CommentCreate',
  data() {
    return {
      comment: {
        content: null,
      }
    }
  },
  methods: {
    createComment() {
      this.$store.dispatch('createComment', this.comment.content)
      console.log(this.comment.content)
    }
  }
}
</script>

<style>

</style>