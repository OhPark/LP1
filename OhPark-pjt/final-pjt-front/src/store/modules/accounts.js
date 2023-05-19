import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
    token: localStorage.getItem("token") || null,
	},
	getters: {		
		isLogin(state) {
			return state.token ? true : false
		},
		auth_token(state) {
			return state.token
		}
	},
	mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
			console.log(state.token)
      router.push({name: 'CommunityView'})
    },
    LOG_OUT(state) {
      state.token = null
      router.push({name: 'CommunityView'})
    }
	},
	actions: {
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2
      
      axios({
        method: 'post',
        url: `${BASE_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
      .then((res) => {
        console.log(res)
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
        url: `${BASE_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then((res) => {
				console.log(res.data.key)
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch((err) => {
        console.log(err)
      })
    },
	}
}