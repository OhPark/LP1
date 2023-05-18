<template>
  <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="createArticle">
      <label for="title">제목: </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <!-- <label for="image">이미지: </label>
      <v-file-input id="image" class="input" type="file" counter show-size label="이미지 제출" outlined dense multiple prepend-icon="mdi-camera" style="width: 400px; margin-left: 100px;" @change="onImageChange"> -->
      <label for="content">내용: </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleCreateView',
  data() {
    return {
      title: null,
      content: null,
      image: null,
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content

      if (!title) {
        alert('제목을 입력해주세요')
        return 
      } else if (!content){
        alert('내용을 입력해주세요')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/communities/`,
        data: {title, content},
      })
      .then(() => {
        this.$router.push({name: 'CommunityView'})
      })
      .catch((err) => {
        console.log(err)
      })
    },
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