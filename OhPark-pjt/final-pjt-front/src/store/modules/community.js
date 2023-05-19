import axios from 'axios'
import router from '@/router'


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
        url: `${BASE_URL}/communities/`,
      })
      .then((res) => {
        context.commit('GET_ARTICLES', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    createArticle(context, payload) {

      if (!payload.title) {
        alert('제목을 입력해주세요')
        return 
      } else if (!payload.content){
        alert('내용을 입력해주세요')
        return
      }
      axios({
        method: 'post',
        url: `${BASE_URL}/communities/`,
        data: payload,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
      .then((res) => {
        console.log(res)
        router.push({name: 'CommunityView'})
      })
      .catch((err) => {
        console.log(err)
      })
    },
	}
}