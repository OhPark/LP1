<template>
  <div>
    <div>
      <img :src="getImageUrl(movie.poster_path)" alt="poster">
      <h3>
        제목: {{ movie?.title }}  
      </h3>
      <p>
        줄거리: {{ movie?.overview }}
      </p>
      <span>
        장르: 
      </span>
      <span v-for="genre in movie?.genres" :key="genre.id">
        {{ genre.name }}
        <!-- 나중에 css로 태그화시키자! -->
      </span>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      movie_id: this.$route.params.movie_id,
    }
  },
  computed: {
    movie () {
      return this.$store.getters.movie
    }
  },
  methods: {
    getImageUrl (path, size = 500) {
      return `https://image.tmdb.org/t/p/w${size}${path}`
    },
  }
}
</script>

<style>

</style>