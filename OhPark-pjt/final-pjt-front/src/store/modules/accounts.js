import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
	},
	getters: {		
		isLogin(state) {
			return state.token ? true : false
		}
	},
	mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name: 'CommunityView'})
    }
	},
	actions: {
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

	}
}