<template>
	<div>
		<div v-if="isReady === false">
			<button class="start" @click="startWorldcup">
				시작하기
			</button>
		</div>
		<div v-else>
			<h3 id="round">{{ readyCount }} 강</h3>
			<hr><br>
			<div class="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-xl-6 g-4 justify-content-center">
				<div class="card-1 col-6 mx-auto">
					<WorldcupCard :movie="movieLeft" v-on:selectCard="select" />
				</div>
				<div class="card-2 col-6 mx-auto">
					<WorldcupCard :movie="movieRight" v-on:selectCard="select" />
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import WorldcupCard from '@/components/Worldcup/WorldcupCard.vue'
import * as _ from 'lodash'

export default {
  components: {
    WorldcupCard
  },
	data() {
		return {
			movieLeft : null,
			movieRight : null,
			counter: 0,
			order: null,
			isReady: false
		}
	},
	computed: {
		selected() {
			return this.$store.getters.seletedMovies
		},
		readyMovies() {
			return this.$store.getters.readyMovies
		},
		readyCount() {
			return this.$store.getters.readyCount
		}
	},
	methods: {

		select (movie) {
			console.log('버튼 클릭 했습니다.', movie);
			this.$store.commit('SELECT', movie);
			this.counter += 1;
			if (this.counter === this.readyCount / 2) {
				this.finishRound();
			}
			this.changeCards(this.counter)
		},

		changeCards(index) {
			this.movieLeft = this.readyMovies[this.order[index * 2]]
			this.movieRight = this.readyMovies[this.order[index * 2 + 1]]
		},

		finishRound() {
			if (this.counter === 1) {
				this.$router.push({name: 'worldcupFinish', params: {movie_id: this.selected[0].id}});
				return this.isReady = false
			} else {
				this.$store.commit("CHANGE_ROUNDS");
			}
			this.counter = 0;
			this.pickOrder(this.readyCount)
		},

		pickOrder(number) {
			let randomArr = _.sampleSize(_.range(number), number)
			console.log(randomArr)
			this.order = randomArr
		},

		setWorldcup() {
			this.$store.commit("FREE_WORLDCUP")
			const version = _.sample(_.range(3))
			this.$store.dispatch('setWorldcup', version)
		},
		startWorldcup() {
			console.log('ready 들어옴?', this?.readyMovies)
			console.log('ready 수', this?.readyCount)
			this.pickOrder(this?.readyCount)
			this.changeCards(this?.counter)
			this.isReady = true	
		}
	},
	created() {
		this.counter = 0;
		this.setWorldcup();
	}
}
</script>

<style scoped>
#round {
	margin: 15px;
}

</style>