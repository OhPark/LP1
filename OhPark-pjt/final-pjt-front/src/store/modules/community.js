import axios from 'axios'
import router from '@/router'



const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
    articles: null,
		article: null,
	},
	getters: {
		article(state) {
			return state.article
		},
		articles(state) {
			return state.articles
		}
	},
	mutations: {		
		GET_ARTICLES(state, articles) {
			state.articles = articles
		},
		GET_ARTICLE_DETAIL(state, payload) {
			console.log(payload)
			state.article = payload
		}
	},
	actions: {
    getArticles(context) {
			axios ({
				method: 'get',
        url: `${BASE_URL}/communities/`,
				headers: {Authorization: `Token ${context.getters.auth_token}`}
			})
			
				.then((res) => {
					console.log("getAritcles actions")
					console.log(res)
					context.commit('GET_ARTICLES', res.data)
				})
				.catch((err) => {
					console.error(err)
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
			console.log(context.getters.auth_token)
      axios({
        method: 'post',
        url: `${BASE_URL}/communities/`,
        data: payload,
        headers: {Authorization: `Token ${context.getters.auth_token}`}
      })
      .then((res) => {
        console.log(res)
        router.push({name: 'CommunityView'})
      })
      .catch((err) => {
        console.log(err)
      })
    },
		getArticleDetail(context, article_id) {
			axios({
        method: 'get',
        url: `${BASE_URL}/communities/${ article_id }/`
      })
      .then((res) => {
        context.commit("GET_ARTICLE_DETAIL", res.data)
      })
      .catch((err) => {
        console.log(err)
      })
		}
	}
}