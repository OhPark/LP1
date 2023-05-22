<template>
  <div class="col">
    <article class="card mx-auto" @click="goToDetail">
      <img :src="getImageUrl(movie.poster_path)" alt="poster">
      <h4 class="card-title">{{ movie.title }}</h4>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
  methods: {
    getImageUrl (path, size = 400) {
      return `https://image.tmdb.org/t/p/w${size}${path}`
    },
    goToDetail () {
      this.$store.commit('NEW_MOVIE')
      this.$store.dispatch('getMovie', this.movie.id)
    }
  }
}
</script>

<style scoped>

</style>