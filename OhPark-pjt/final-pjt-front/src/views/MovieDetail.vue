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
    <div id="reviews">
      <ul>
        <ReviewItem v-for="review in reviews" :key="review.id" :review="review" />
      </ul>
      <br>
      <button @click="goReviewCreate">Create</button>
    </div>
  </div>
</template>

<script>
import ReviewItem from '@/components/ReviewItem'

export default {
  data () {
    return {
      movie_id: this.$route.params.movie_id,
    }
  },
  components: {
    ReviewItem,
  }
  ,
  computed: {
    movie () {
      return this.$store.getters.movie
    },
    reviews () {
      return this.$store.getters.reveiws
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