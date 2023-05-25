<template>
  <div>
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password1"> password : </label>
      <input type="password" id="password1" v-model="password1"><br>

      <label for="password2"> password confirmation : </label>
      <input type="password" id="password2" v-model="password2">
      
      <input type="submit" value="SignUp">
    </form>
    <p v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  computed: {
    check() {
      return this.$store.getters.check
    }
  },
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      errMsg: null,
    }
  },
  methods: {
    signUp() {
      // console.log('signup')

      const payload = {
        username : this.username, 
        password1 : this.password1, 
        password2 : this.password2,
      }
      console.log('signup methods 안')
      this.$store.dispatch('signUp', payload)
      .then(() => {
        this.check_method()
      })
    },
    check_method() {
      if (this.$computed.check === 'success') {
        console.log('trends 새로 가져옵니다.')
        this.$store.dispatch('getTrends', true)
      }
      else {

        console.log('checkmethod errorMsg 부분')

        if (this.check === 'special') {
          this.errMsg = '특수문자는 포함될 수 없습니다.'
        } 
        else if (this.check === 'korean') {
          this.errMsg = '한글은 포함될 수 없습니다.'
        }
        else if (this.check === 'passwords_not_match') {
          this.errMsg = '두 비밀번호를 다르게 입력하였습니다.'
        }
        else if (this.check === 'duplicated_name') {
          this.errMsg = '중복된 아이디가 존재합니다.'
        }
        else if (this.check === 'password') {
          this.errMsg = '비밀번호는 최소 8자 이상, 두 가지 이상의 문자를 가지고 있어야 합니다.'
        } 
        else {
          this.errMsg = '올바르지 않은 정보가 입력되었습니다.'
        } 
        this.$router.go(0)
      }
    }
  },
  created() {
    this.$store.commit("FREE_INFO")
    this.errMsg = null
  }
}
</script>
