<template>
  <div>
    <h1>LogIn Page</h1>
    <form @submit.prevent="login">
      <div class="form-container">
      <div class="form-floating mb-2">
      <input type="text" class="form-control" id="username" placeholder="username" v-model="username"><br>
      <label for="username">username</label>
      </div>
      <div class="form-floating">
      <input type="password" class="form-control" id="password" placeholder="password" v-model="password"><br>
      <label for="password"> password</label>
      </div>
      </div>
      <input class="btn btn-outline-primary waves-effect mb-4" type="submit" value="logIn">
    </form>
  </div>
  
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }
      this.$store.dispatch('getTrends', true)
      this.$store.dispatch('login', payload)

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
