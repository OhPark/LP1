import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trends: [],
  },
  getters: {
  },
  mutations: {
    GET_TRENDS(state, payload) {
      state.trends = payload
      console.log(payload)
    }
  },
  actions: {
    getTrends(context) {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/movie/week',
        params: {language: 'ko'},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWZlZWJmZTk5YWU0MGRlNjhhZmIyYzYzMDNhZjY2NSIsInN1YiI6IjYzYzEwOWVkOGVmZTczMDA3ZDhmMjgzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fmZtOL8QkrT9vkl9HWLxwOYTNqmu1dqs5xf1R2yklmw'
        }
      }
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data)
          context.commit('GET_TRENDS', response.data.results)
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  },
  modules: {
  }
})
