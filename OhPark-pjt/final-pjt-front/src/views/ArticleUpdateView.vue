<template>
  <div>
    <h1>게시글 수정</h1>
    <form @submit.prevent="updateArticle">
      <label for="title">제목: </label>
      <input type="text" id="title" v-model.trim="article.title"><br>
      <!-- <label for="image">이미지: </label>
      <v-file-input id="image" class="input" type="file" counter show-size label="이미지 제출" outlined dense multiple prepend-icon="mdi-camera" style="width: 400px; margin-left: 100px;" @change="onImageChange"> -->
      <label for="content">내용: </label>
      <textarea id="content" cols="30" rows="10" v-model="article.content"></textarea>
      <input type="submit" id="submit">
    </form>

  </div>
</template>

<script>
export default {
  name: 'ArticleUpdateView',
  computed: {
    article() {
      return this.$store.getters.article
    },
  },
  methods: {
    updateArticle() {
      this.$store.dispatch('updateArticle', this.article)
      console.log(this.article)
    }
  }
}
</script>

<style>

</style>