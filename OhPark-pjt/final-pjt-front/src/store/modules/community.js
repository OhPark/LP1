import axios from 'axios'


const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
    articles: [],
	},
	getters: {
	},
	mutations: {		
		GET_ARTICLES(state, articles) {
			state.articles = articles
		},
	},
	actions: {
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

	}
}