<template>
  <b-carousel-slide :img-src="imgUrl">
    <article @click="goToDetail" >
      <h4 class="">{{ movie?.title }}</h4>
    </article>
  </b-carousel-slide>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: `https://image.tmdb.org/t/p/original${this.$props.movie.poster_path}`,
    }
  },
  props: {
    movie: Object,
  },
  methods: {
    goToDetail () {
      this.$store.commit('NEW_MOVIE')
      console.log('버튼 클릭 했습니다.', this.movie.id)
      this.$store.dispatch('getMovie', this.movie.id)
    }
  },
}
</script>

<style scoped>

</style>