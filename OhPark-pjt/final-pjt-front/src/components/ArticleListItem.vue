<template>
  <div class="articles">
    <div class=" bg-white rounded box-shadow" id="articlebox">
      <h6 class="border-bottom border-gray pb-2 mb-0">
        <span id="spant" style="float: left;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
          </svg>{{ article?.user_name }}</span>
        <button class="btn" @click="goToArticleDetail"> {{ article?.title }}
        </button>
        <span id="spant" style="float: right;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
          </svg>{{ article?.created_at.substring(0, 10) }} | {{ article?.created_at.substring(11, 16) }}</span> 
      </h6>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  methods: {
    goToArticleDetail() {
      this.$store.dispatch('getArticleDetail', this.article.id)
      this.$router.push({ name: 'ArticleDetailView', params: {article_id: this.article.id } })
    }
  }
}
</script>

<style>
#articlebox {
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 300px;
  margin-right: 300px;
  min-width: 300px;
}

#spant {
  margin-top: 10px;
}
</style>
