import axios from 'axios'
import router from '@/router'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'

export default {
	state: {
    token: null,
    username: null,
    profile: null,
    route: null,
    check: null,
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
    },
    check(state) {
      return state.check
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
      state.profile = null
    },
    SET_PROFILE(state, profile) {
      state.profile = profile
    },
    SET_ROUTE(state, route) {
      state.route = route;
    },
    CHECK_MSG(state, payload) {
      console.log('mutations는 들어와?', payload)
      state.check = payload
      console.log('할당 됐나.', state.check)
    },
    FREE_INFO(state) {
      state.check = null
      state.username = null
      state.profile = null
    }
	},
	actions: {
    signUp(context, payload) {
      console.log('actions signup')

      const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
      const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
      if (check_spc.test(payload.username)) {
        console.log('특수문자 안들어와?')
        return context.commit('CHECK_MSG', 'special');

      } 
      else if (check_kor.test(payload.username)) {
        console.log('한글 안들어와?')
        context.commit('CHECK_MSG', 'korean');
        console.log('mutation 보내면 끝?')
      } 
      else {
        console.log('else 인데 안들어오겠지?')

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
            console.log('회원가입 성공')
            context.commit('SAVE_TOKEN', user_info)
            context.commit('CHECK_MSG', 'success')
          })
          .catch((err) => {
            // console.log(err)
            console.log(err.response.data)
            if (err.response.data.non_field_errors != undefined) {
              return context.commit('CHECK_MSG', 'passwords_not_match')
              
            } else if (err.response.data.username != undefined) {
              return context.commit('CHECK_MSG', 'duplicated_name')

            } else if (err.response.data.password1 != undefined) {
              return context.commit('CHECK_MSG', 'password')

            } else {
              return context.commit('CHECK_MSG', 'unkown_error')

            }
          })
        console.log('aciotions의 끝')
      }
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
        context.commit('SET_PROFILE')
      })
      .catch((err) => {
        console.error(err)
      })
    }
	}
}