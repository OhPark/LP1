import axios from 'axios'

// import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
		seletedMovies: [],
		readyMovies: null,
		final: null
	},
	getters: {
		seletedMovies(state) {
			return state.seletedMovies
		},
		readyMovies(state) {
			return state.readyMovies
		},
		readyCount(state) {
			return state.readyMovies.length
		},
		final(state) {
			return state.final
		}
	},
	mutations: {
		CHANGE_ROUNDS(state) {
			state.readyMovies = state.seletedMovies
			state.seletedMovies = []
		},

		FREE_WORLDCUP(state) {
			state.readyMovies = null;
		},

		SELECT(state, movie) {
			state.seletedMovies.push(movie)
		},

		SET_WORLDCUP(state, payload) {
			state.readyMovies = payload
		},

		SET_FINAL(state, movies) {
			state.final = movies
		}
	},
	actions: {
		setWorldcup(context, version) {
			console.log('version', version)
			axios({
				method: 'GET',
				url: `${BASE_URL}/movies/worldcup/${version}/`
			})
				.then((response) => {
					context.commit('SET_WORLDCUP', response.data.splice(0, 16))
			})
		},
		setFinal(context, movie_id) {
			axios({
				method: 'GET',
				url: `${BASE_URL}/movies/similar/${movie_id}/`
			})
				.then(response => {
					context.commit('SET_FINAL', response.data)
			})
		}
	},
}