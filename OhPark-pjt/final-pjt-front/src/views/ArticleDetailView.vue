<template>
  <div>
    <h1>Detail</h1>
    <p>글 번호: {{ article?.id }}</p>
    <p>제목: {{ article?.title }}</p>
    <p>{{ article?.image }}</p>
    <p>작성시간: {{ article?.created_at }}</p>
    <p>수정시간: {{ article?.updated_at }}</p>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ArticleDetailView',
  data() {
    return {
      article: null,
    }
  },
  create() {
    this.getArticleDetail()
  },
  method: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/communities/${ this.$route.params.id }/`
      })
      .then((res) => {
        this.article = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>