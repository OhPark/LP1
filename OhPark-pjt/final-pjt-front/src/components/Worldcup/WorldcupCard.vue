<template>
  <div>
    <article class="card mx-auto" @click="selet">
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
    selet () {
      console.log('버튼 클릭 했습니다.', this.movie_id)
      this.$store.dispatch('seletedMovies', this.movie_id)
    }
  }
}
</script>

<style scoped>

</style>