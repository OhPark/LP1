<template>
    <div>
      <div>
        <img :src="getImageUrl(movie?.poster_path)" alt="poster">
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
        </span>
        <br>
        <div class="video"></div>
          <iframe v-if="movie.videos.results[0]" id="player" type="text/html" width="640" height="360"
          :src="getVideoUrl(movie.videos.results[0].key, movie.videos.results[0].site)"
          frameborder="0" />
          <p v-else> 영상이 없습니다. </p>
      </div>
      <button @click="flagChange">펼치기</button>
      <div v-if="flag" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <MovieCard v-for="similar in final" :key="similar.id" :movie="similar"/>
      </div>
    </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
    components: {
        MovieCard
    },
    data() {
        return {
            flag: false,
            movie_id: this.$route.params.movie_id,
        }
    },

	computed: {
        final() {
			return this.$store.getters.final
		},
        movie() {
            return this.$store.getters.movie
        }
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
        flagChange() {
            this.flag = !this.flag
        },
        getFinal() {
            this.$store.dispatch('setFinal', this.movie_id)
        },
        getDetail() {
            this.$store.dispatch('getMovie', this.movie_id)
        }
	},
	created() {
		this.getFinal()
        this.getDetail()
		
	},
}
</script>

<style scoped>
button {
    margin: 10px;
}

</style>