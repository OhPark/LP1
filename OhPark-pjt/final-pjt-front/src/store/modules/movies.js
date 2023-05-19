import axios from 'axios'


const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
		trends: null,
    movie: null,
    search: null,
		reviews: null,
	},
	getters: {
		movie (state) {
      return state.movie
    },

    reviews (state) {
      return state.reveiws
    },
	},
	mutations: {
    GET_TRENDS(state, payload) {
      state.trends = payload
      console.log(payload)
    },
    GET_MOVIE(state, payload) {
      state.movie = payload
      console.log('movie mutation 들어옴')
    },
    GET_REVIEWS(state, payload) {
      state.reviews = payload
      console.log('review mutation')
    },
	},
	actions: {
    getTrends(context) {
      console.log("actions 입니다.")
      console.log(this.trends)
      if (!this.trends) {
        const options = {
          method: 'GET',
          url: `${BASE_URL}/movies/trends/`,
        }
        
        axios
          .request(options)
          .then(function (response) {
            console.log('response 임', response)
            context.commit('GET_TRENDS', response.data)
          })
          .catch(function (error) {
            console.error(error)
          })
      } else {
        return
      }
    },
    getMovie(context, movie_id) {
      const options = {
        method: 'GET',
        url: `${BASE_URL}/movies/${movie_id}`,
      }
  
      axios
        .request(options)
        .then(function (response) {
          console.log(response)
          context.commit('GET_MOVIE', response.data)
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    getReviews(context, movie_id) {
      const options = {
        method: 'GET',
        url: `${BASE_URL}/movies/${movie_id}/reviews`
      }

      axios
        .request(options)
        .then(function (response) {
          console.log(response)
          context.commit('GET_REVIEWS', response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // createReview(context, movie_id) {
    //   const options = {
    //     method: 'POST',
    //     url: `${BASE_URL}/movies/${movie_id}/reviews/create`
    //   }
    // },
	}
}