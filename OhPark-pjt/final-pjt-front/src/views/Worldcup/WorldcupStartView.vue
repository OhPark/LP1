<template>
	<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
		<div class="card-1 col-3">
			<MovieCard @click="select(movieLeft)" :movie="movieLeft" />
		</div>
		<div class="card-2 col-8">
			<MovieCard @click="select(movieRight)" :movie="movieRight" />
		</div>
	</div>
</template>

<script>
import MovieCard from '@/components/MovieCard'
import * as _ from 'lodash'

export default {
  components: {
    MovieCard
  },
	data() {
		return {
			movieLeft : null,
			movieRight : null,
			counter: 0,
			order: null
		}
	},
	computed: {
		selected() {
			return this.$store.getters.seletedMovies
		},
		ready() {
			return this.$store.getters.readyMovies
		},
		readyCount() {
			return this.$sotre.getters.readyCount
		}
	},
	methods: {

		select () {
      console.log('버튼 클릭 했습니다.', this.movie_id);
      this.$store.dispatch('selectMovie', this.movie_id);
			this.counter += 1;
			if (this.counter == this.$computed.readyCount / 2) {
				this.finishRound();
			}
			this.changeCards(this.counter)
    },

		finishRound() {
			if (this.counter === 1) {
				this.$store.commit("FREE_WORLDCUP")
				this.$router.replace({name: 'worldcupFinish', params: {movie_id: this.$computed.selected[0].id}});
			} else {
				this.$store.dispatch('startRound');
			}
			this.counter = 0;
			this.pickOrder(this.$computed.readyCount)
		},

		pickOrder(number) {
			let randomArr = _.sampleSize(_.range(number), number)
			console.log(randomArr)
			this.order = randomArr
		},

		changeCards(index) {
			this.movieLeft = this.$computed.readyMovies[this.order[index * 2]]
			this.movieRight = this.$computed.readyMovies[this.order[index * 2 + 1]]
		}
	},
	created() {
		this.counter = 0;
		this.finishRound()
	}
}
</script>

<style>

</style>