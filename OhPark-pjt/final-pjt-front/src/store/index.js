import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
import router from '../router'

Vue.use(Vuex)
const BASE_URL = 'http://127.0.0.1:8000/api/v1'


export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    trends: null,
    movie: null,
    search: null,

    reviews: null
    articles: [],

  },
  getters: {
    movie (state) {
      return state.movie
    },

    reviews (state) {
      return state.reveiws
    },
    isLogin(state) {
      return state.token ? true : false
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
    GET_REVIEWS(state, payload) {
      state.reviews = payload
      console.log('review mutation')
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name: 'CommunityView'})
    }
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
    createReview(context, movie_id) {
      const options = {
        method: 'POST',
        url: `${BASE_URL}/movies/${movie_id}/reviews/create`
      }
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/communities/`,
      })
      .then((res) => {
        context.commit('GET_ARTICLES', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    signUp(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${BASE_URL}/accounts/signup`,
        data: {
          username, password
        }
      })
      .then((res) => {
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${BASE_URL}/accounts/login`,
        data: {
          username, password
        }
      })
      .then((res) => {
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
