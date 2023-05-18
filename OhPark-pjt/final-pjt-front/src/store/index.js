import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
const BASE_URL = 'http://127.0.0.1:8000/api/v1'


export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    trends: null,
    movie: null,
    search: null
  },
  getters: {
    movie (state) {
      return state.movie
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
  },
  modules: {
  }
})
