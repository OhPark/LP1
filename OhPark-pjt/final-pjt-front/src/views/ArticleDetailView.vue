<template>
  <div id="detailbox">
    <br><br>
    <p>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
      </svg> {{ article?.user_name }}
    </p>
    <p>
      <button class=" btn btn-outline-danger btn-sm" style="border: none;" @click="likeArticle">
       ♥ {{ like_count }}
      </button> {{ article?.title }}
    </p>
    <!-- <p>{{ article?.image }}</p> -->
    <hr>
    <p>{{ article?.content }}</p>
    <div class="comment-list">
    <div v-if="article.comments" >
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button id="btncom" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body"><ArticleCommentList :comments="article?.comments" />
              <p v-for="comment in article?.comments" :key="comment.id">
                {{comment?.comment_username}}: {{ comment?.content }}
                <button class=" btn btn-outline-secondary btn-sm" @click="deleteComment(comment?.id)">삭제</button>
              </p>
              <CommentCreate :article_id="article?.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h6>댓글이 없습니다</h6>
    </div>
  </div>

    <p style="color: lightgray;">작성: {{ article?.created_at.substring(0, 10) }} | {{ article?.created_at.substring(11, 16) }}</p>
    <p style="color: lightgray;">수정: {{ article?.updated_at.substring(0, 10) }} | {{ article?.updated_at.substring(11, 16) }}</p>
    <div class="buttons">
    <button class=" btn btn-outline-secondary waves-effect mb-4" style="border: none;" @click="deleteArticle">삭제</button>
    <button class=" btn btn-outline-primary waves-effect mb-4" style="border: none;" @click="gotoUpdateArticle">수정</button>
    </div>
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
      article_id : this.$route.params.article_id,
    }
  },
  computed: {
    article() {
      return this.$store.getters.article
    },
    like_count: {
      get() {
        return this.article.user_count
      },
      set(newValue) {
        console.log(newValue)
      }
    }
  },
  methods: {
    deleteArticle () {
      this.$store.dispatch('deleteArticle', this.article.id)
      this.$store.dispatch('getArticles')
      this.$router.push({ name: 'CommunityView'})
    },
    gotoUpdateArticle() {
      console.log(this.article)
      this.$router.push({ name: 'ArticleUpdateView'})
    },
    deleteComment (comment_id) {
      const payload = {
        article_id: this.article_id,
        comment_id: comment_id,
      }
      console.log('deleteComment 들어옴',payload)
      this.$store.dispatch('deleteComment', payload)
    },
    async likeArticle() {
      this.$store.dispatch('likeArticle', this.article.id)
      await setTimeout(() => {this.$store.dispatch('getArticleDetail', this.article.id)}, 200)
      console.log(this.article.user_count)
    }
  },
  created() {
    // console.log('params', this.$route.params.article_id)
    this.$store.dispatch('getArticleDetail', this.$route.params.article_id)
  },
}

</script>

<style scoped>
#btncom {
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 20px; 
  margin-bottom: 6px;

  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  width: 300px; 
}

#detailbox {
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  margin: auto;
}
</style>