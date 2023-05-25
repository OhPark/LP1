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
      <br>
      <div class="video"></div>
        <iframe v-if="movie.videos.results[0]" id="player" type="text/html" width="640" height="360"
        :src="getVideoUrl(movie.videos.results[0].key, movie.videos.results[0].site)"
        frameborder="0" />
        <p v-else> 영상이 없습니다. </p>
    </div>
    <div id="reviews">
      <h3>Review</h3>
      <ul>
        <ReviewItem v-for="review in movie?.review_set" :key="review.id" :review="review" />
      </ul>
      <br>
      <button @click="reviewCreate">Create</button>
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
      console.log(this.$store.getters.movie)
      return this.$store.getters.movie
    },
  },
  methods: {
    getImageUrl (path, size = 500) {
      return `https://image.tmdb.org/t/p/w${size}${path}`
    },
    getVideoUrl (video_key, video_type) {
      console.log(video_type, video_key)
      if (video_type === 'YouTube') {
        return `https://www.youtube.com/embed/${video_key}`
      }
      else if (video_type === 'vimeo') {
        return `https://www.vimeo.com/${video_key}`
      }
    },
    reviewCreate() {
      this.$router.push({ name: 'reviewCreate', params: { movie_id: this.movie_id }})
    }
  },
  created() {
    this.$store.commit('NEW_MOVIE')
    this.$store.dispatch('getMovie', this.movie_id)
  }
}
</script>

<style>

</style>