<template>
  <div class="col">
    <article class="card mx-auto" @click="goToDetail">
      <img :src="getImageUrl(movie?.poster_path)" alt="poster">
      <h4 class="card-title">{{ movie?.title }}</h4>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
  computed: {
    movie_id() {
      return this.$props.movie.id
    }
  },
  methods: {
    getImageUrl (path, size = 400) {
      return `https://image.tmdb.org/t/p/w${size}${path}`
    },
    goToDetail () {
      // console.log('버튼 클릭 했습니다.', this.movie_id)
      // this.$store.dispatch('getMovie', this.movie_id)
      this.$router.push({name: 'movieDetail', params: {movie_id: this.movie_id}})
    }
  }
}
</script>

<style scoped>
  .card {
    width: 300px;
    margin: 50px;
  }
  .card-title {
  word-break: keep-all;
  }
</style>