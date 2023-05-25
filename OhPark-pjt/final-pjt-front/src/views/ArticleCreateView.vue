<template>
  <div>
    <h1>게시글 작성</h1><hr>
    <form @submit.prevent="createArticle">
      <label for="title">제목: </label>
      <input type="text" id="title" v-model.trim="article.title"><br><br>
      <!-- <label for="image">이미지: </label>
      <v-file-input id="image" class="input" type="file" counter show-size label="이미지 제출" outlined dense multiple prepend-icon="mdi-camera" style="width: 400px; margin-left: 100px;" @change="onImageChange"> -->
      <label for="content">내용: </label>
      <textarea id="content" cols="30" rows="10" v-model="article.content"></textarea>
      <br><input class="btn btn-outline-primary waves-effect mb-4" type="submit" id="submit">
    </form>
  </div>
</template>

<script>
// import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleCreateView',
  data() {
    return {
      article: {
        title: null,
        content: null,
        image: null,
      }
    }
  },
  methods: {
    createArticle() {
      this.$store.dispatch('createArticle', this.article)
    }
    // inImageChange(file) {
    //   if (!file) {
    //     return
    //   }
    //   const formData = new FormData()
    //   this.uploadimageurl = []
    //   file.forEach((item) => {
    //     formData.append('filelist', item)
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //       this.uploadimageurl.push({url: e.target.result})
    //     }
    //     reader.readAsDataURL(item)
    //   })
    //   axios({
    //     url: `${API_URL}/api/v1/communities/`,
    //     method: 'post',
    //     headers: {'Content-Type': 'multipart/form-data'},
    //     data: formData,
    //   })
    //   .then((res) => {
    //     console.log(res.data.message)
    //     this.image = file.length
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style>

</style>