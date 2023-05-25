import axios from 'axios'

import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
		trends: null,
    movie: null,
    search: null,
		review: null,
	},
	getters: {
		movie (state) {
      return state.movie
    },
    review (state) {
      return state.review
    },
    trends(state) {
      return state.trends
    },
    search(state) {
      return state.search
    }
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
    GET_REVIEW(state, payload) {
      state.review = payload
      console.log('review mutation')
      console.log(state.review)
    },
    NEW_MOVIE(state) {
      state.movie = null
    },
    DELETE_REVIEW(state) {
      state.review = null
    },
    FREE(state) {
      state.trends = null
    },
    SEARCH_MOVIES(state, movies) {
      state.search = movies
    }
	},
	actions: {
    getTrends(context, can_bool) {
      console.log("trends 안에 actions 입니다.")
      console.log(this.trends)
      if (can_bool === true) {
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
      }
      console.log('axios 끝난 후입니다.')
      console.log(this.trends)
    },
    getMovie(context, movie_id) {
      console.log('getMovie는 들어왔다')
      axios.request({
          method: 'GET',
          url: `${BASE_URL}/movies/${movie_id}`,
        })
        .then(function (response) {
          console.log('첫번째 getMovie')
          context.commit('GET_MOVIE', response.data)
          
        })
        .catch(function (error) {
          console.log('get movie error 들어왓습니다.')
          console.error(error)
        })
        // router.push({name: 'movieDetail', params: {movie_id: movie_id}})
    },
    createReview(context, payload) {
      console.log('리뷰 액션s')
      console.log(payload)
      const options = {
        method: 'POST',
        url: `${BASE_URL}/movies/${payload.movie_id}/reviews/create/`,
        data : {
          title: payload.title,
          content: payload.content,
          score: payload.score
        },
        headers: {Authorization: `Token ${context.getters.auth_token}`}
      }
      return axios.request(options)
        .then(function(response) {
          console.log(response.data)
        })
        .catch(function(error) {
          console.error(error)
        })
    },
    getReview(context, review_id) {
      axios.request({
        method: 'GET',
        url: `${BASE_URL}/movies/reviews/${review_id}`,
      })
        .then(function(response) {
          context.commit('GET_REVIEW', response.data)
        }) 
    },
    deleteReview(context, review_id) {
      console.log('일단 delete는 들어왔다')
      return axios.request({
        method: 'DELETE',
        url: `${BASE_URL}/movies/reviews/${review_id}`,
        headers: {Authorization: `Token ${context.getters.auth_token}`},
      })
      .then(function(response) {
        console.log('delete도 제대로 됐다.', response)
        context.commit('DELETE_REVIEW')
        return Promise.then()
      })
      .catch(function(error) {
        console.log('delete review error 들어왔습니다.')
        console.error(error)
      })
    },
    updateReview(context, payload) {
      console.log('update')
      console.log(payload)
      axios.request({
        method: 'PUT',
        url: `${BASE_URL}/movies/reviews/${payload.id}/`,
        headers: {Authorization: `Token ${context.getters.auth_token}`},
        data : {
          title: payload.title,
          content: payload.content,
          score: payload.score
        },
      })
        .then(function(response) {
          context.commit('GET_REVIEW', response.data)
        })
        .catch(function(error) {
          console.error(error)
        })
    },
    searchMovies(context, keyword) {
      console.log('actions 들어옴?', keyword)
      axios.request({
        method: 'GET',
        url: `${BASE_URL}/movies/search/${keyword}/`,
      })
      .then(function (response) {
        console.log('첫번째 searchMovie')
        console.log(response.data)
        context.commit('SEARCH_MOVIES', response.data)
        router.push({name: 'movieSearch', params: {keyword: keyword}})
      })
      .catch(function (error) {
        console.log('search movie error 들어왓습니다.')
        console.error(error)
      })
    }
	}
}