<template>
  <div>
    <h1>Sign Up</h1><br>
    <form @submit.prevent="signUp">
      <div class="form-container">
      <div class="form-floating mb-2">
      <input type="text" id="username" class="form-control" placeholder="username" v-model="username">
      <label for="username">username</label>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="password1" placeholder="password" v-model="password1">
      <label for="password1">password</label>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="password2" placeholder="password confirmation" v-model="password2">
      <label for="password2">password confirmation</label>
      </div>
      </div>
      <br>
      <input class="btn btn-outline-primary waves-effect mb-4" type="submit" value="SignUp">
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      // console.log('signup')
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username, password1, password2
      }
      this.$store.dispatch('getTrends', true)
      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>

<style scoped>
.form-control {
  width: 300px;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>