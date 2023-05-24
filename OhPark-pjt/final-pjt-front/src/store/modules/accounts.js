import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    profile: {},
	},
	getters: {		
		isLogin(state) {
			return state.token ? true : false
		},
		auth_token(state) {
			return state.token
		},
    profile(state) {
      return state.profile
    }
	},
	mutations: {
    SAVE_TOKEN(state, payload) {
      state.token = payload.token
      state.username = payload.username
			console.log(state.token, state.username)
      router.push({name: 'CommunityView'})
    },
    LOG_OUT(state) {
      router.push({name: 'home'})
      state.token = null
      state.username = null
    },
    SET_PROFILE(state, profile) {
      state.profile = profile
    },
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
        const user_info = {
          username: payload.username,
          token: res.data.key,
        }
        context.commit('SAVE_TOKEN', user_info)
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
				console.log(res)
        const user_info = {
          username: payload.username,
          token: res.data.key,
        }
        context.commit('SAVE_TOKEN', user_info)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    setProfile(context, payload) {
      const username = payload
      axios({
        method: 'get',
        url: `${BASE_URL}/accounts/profile/`,
        data: {
          username,
        }
      })
      .then((res) => {
        console.log(res)
        console.log(username)
        context.commit('SET_PROFILE', username)
      })
      .catch((err) => {
        console.log(err)
      })
    }
	}
}