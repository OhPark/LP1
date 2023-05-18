<template>
  <div>
    <h1>Sign Up Page</h1>
    <form @submit.prevent="signUp">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password"> password : </label>
      <input type="password" id="password" v-model="password"><br>
      
      <input type="submit" value="SignUp">
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    signUp() {
      // console.log('signup')
      const username = this.username
      const password = this.password

      const payload = {
        username, password,
      }

      this.$store.dispatch('signUp', payload)

    }
  }
}
</script>
