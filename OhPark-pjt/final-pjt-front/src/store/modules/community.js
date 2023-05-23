import axios from 'axios'
import router from '@/router'



const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
    articles: null,
		article: null,
		comments: null,
		comment: null,
	},
	getters: {
		article(state) {
			return state.article
		},
		articles(state) {
			return state.articles
		},
		comments(state) {
			return state.comments
		}
	},
	mutations: {		
		GET_ARTICLES(state, articles) {
			state.articles = articles
		},
		GET_ARTICLE_DETAIL(state, payload) {
			console.log(payload)
			state.article = payload
		},
		GET_COMMENTS(state, comments) {
			state.comments = comments
		},
		DELETE_ARTICLE(state) {
			state.article = null
		},
		NO_CONTENT(state) {
			state.articles = null
		},
		DELETE_COMMENT(state) {
			state.comment = null
		},
		LIKE_ARTICLE(state) {
			console.log(state)
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
					console.log(typeof(err.response.status))
					if (err.response.status == 404) {
						context.commit('NO_CONTENT')
					}
					else {
						console.log(err)
					}
					
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
        url: `${BASE_URL}/communities/${article_id}/`
      })
      .then((res) => {
        context.commit("GET_ARTICLE_DETAIL", res.data)
      })
      .catch((err) => {
        console.log(err)
      })
		},
		deleteArticle(context, article_id) {
			axios({
				method: 'delete',
				url: `${BASE_URL}/communities/${article_id}/`
			})
			.then(() => {
				context.commit("DELETE_ARTICLE")
			})
			.catch((err) => {
				console.log(err)
			})
		},
		updateArticle(context, article) {
			axios({
				method: 'put',
				url: `${BASE_URL}/communities/${article.id}/`,
				data: {
					title: article.title,
					content: article.content
				},
				headers: {Authorization: `Token ${context.getters.auth_token}`}
			})
			.then((res) => {
				context.commit('GET_ARTICLE_DETAIL', res.data)
				router.push({ name: 'ArticleDetailView', params: {article_id: article.id}})
			})
			.catch((err) => {
				console.log(err)
			})
		},
		getComments(context, article_id) {
			axios({
				method: 'get',
				url: `${BASE_URL}/communities/${article_id}/comments/`,
				headers: {Authorization: `Token ${context.getters.auth_token}`}
			})
			.then((res) => {
				context.commit('GET_COMMENTS', res.data)
			})
			.catch((err) => {
				if (err.response.status == 404) {
					context.commit('NO_CONTENT')
				}
				else {
					console.log(err)
				}
			})
		},
		createComment(context, payload) {
			axios({
				method: 'post',
				url: `${BASE_URL}/communities/${payload.article_id}/comments/`,
				data: {
					content: payload.content
				},
				headers: {Authorization: `Token ${context.getters.auth_token}`}
			})
			// .then(() => {
			// 	router.push({name: 'ArticleDetailView', params: {article_id: payload.article_id}})
			// })
			.catch((err) => {
				console.log(err)
			})
		},
		deleteComment(context, payload) {
			axios({
				method: 'delete',
				url: `${BASE_URL}/communities/${payload.article_id}/comments/${payload.comment_id}/`,
				headers: {Authorization: `Token ${context.getters.auth_token}`},
			})
			.then(() => {
				context.commit('DELETE_COMMENT')
				// router.push({ name: 'ArticleDetailView', params: {article_id: payload.article_id}})
			})
			.catch((err) => {
				console.log(err)
			})
		},
		likeArticle(context, article_id) {
			axios({
				method: 'post',
				url: `${BASE_URL}/communities/${article_id}/like/`,
				headers: {Authorization: `Token ${context.getters.auth_token}`},
			})
			.then(() => {
				context.commit('LIKE_ARTICLE')
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
}