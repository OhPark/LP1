// import axios from 'axios'

// import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
		seletedMovies: [],
		readyMovies: null,

	},
	getters : {
		seletedMovies(state) {
			return state.seletedMovies
		},
		readyMovies(state) {
			return state.readyMovies
		},
		readCount(state) {
			return state.readyMovies.length
		}
	},
	mutations: {
		CHANGE_ROUNDS(state) {
			state.readyMovies = state.seletedMovies
			state.seletedMovies = []
		},

		FREE_WORLDCUP(state) {
			state.readyMovies = null;
		}
	},
	actions: {
		startRound(context) {
			if (state.readyMovies != null) {
				context.commit("CHANGE_ROUNDS")
			} else {
				axios
			}
		},

		selectMovie(context, movie_id) {

		}
	},
}