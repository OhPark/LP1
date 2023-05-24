import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    profile: {},
    route: null
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
    },
    username(state) {
      return state.username
    }
	},
	mutations: {
    SAVE_TOKEN(state, payload) {
      state.token = payload.token
      state.username = payload.username
			console.log(state.token, state.username)
      router.push({name: 'home'})
    },
    LOG_OUT(state) {
      console.log(state.route.name)
      if(state.route.name !== 'home') {
        router.push({name: 'home'})
      } else {
        router.push({name: 'LoginView'})
      }
      state.token = null
      state.username = null
    },
    SET_PROFILE(state, profile) {
      state.profile = profile
    },
    SET_ROUTE(state, route) {
      state.route = route;
    },
	},
	actions: {
    signUp(context, payload) {

      axios({
        method: 'post',
        url: `${BASE_URL}/accounts/signup/`,
        data: {
          username: payload.username, 
          password1: payload.password1, 
          password2: payload.password2
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

      axios({
        method: 'post',
        url: `${BASE_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password
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
    setProfile(context, username) {
      axios({
        method: 'get',
        url: `${BASE_URL}/accounts/profile/${username}`,
      })
      .then((res) => {
        console.log(res)
        console.log(username)
        username = res.data.username
      })
      .catch((err) => {
        console.error(err)
      })
    }
	}
}