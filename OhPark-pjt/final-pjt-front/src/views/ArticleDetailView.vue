<template>
  <div>
    <h1>Detail</h1>
    <p>작성자: {{ article?.user_name }}</p>
    <p>제목: {{ article?.title }}</p>
    <p>글 번호: {{ article?.id }}</p>
    <!-- <p>{{ article?.image }}</p> -->
    <p>내용 : {{ article?.content }}</p>
    <p>작성시간: {{ article?.created_at }}</p>
    <p>수정시간: {{ article?.updated_at }}</p>
    <hr>
    <div class="comment-list">
    <div v-if="article.comments" >
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button id="btncom" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            댓글 목록 펼쳐보기
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body"><ArticleCommentList :comments="article?.comments" />
              <p v-for="comment in article?.comments" :key="comment.id">
                {{comment?.comment_username}}: {{ comment?.content }}
                <button class=" btn btn-outline-secondary waves-effect" @click="deleteComment(comment?.id)">삭제</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h6>댓글이 없습니다</h6>
    </div>

  </div>
    <CommentCreate :article_id="article?.id" />
    <hr>
    <button class=" btn btn-outline-danger waves-effect mb-4" @click="likeArticle">
      좋아요 ♥ {{ like_count }}
    </button>
    <button class=" btn btn-outline-secondary waves-effect mb-4" @click="deleteArticle">게시글 삭제</button>
    <button class=" btn btn-outline-primary waves-effect mb-4" @click="gotoUpdateArticle">게시글 수정</button>
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
    like_count() {
      return this.article.user_count
    },
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
    likeArticle() {
      this.$store.dispatch('likeArticle', this.article.id)
    }
  },
  created() {
    this.$store.dispatch('getArticleDetail', this.article_id)
  }
}
</script>

<style>
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
</style>