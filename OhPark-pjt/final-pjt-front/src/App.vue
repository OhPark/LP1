<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-sm">
        <div class="container-fluid">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'CommunityView' }">Community</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'worldcupHome'}">World Cup</router-link>
            </li>
          </ul>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item" v-if="isLogin">
                <router-link class="nav-link" :to="{ name: 'ProfileView', params: {username: username} }">Profile</router-link>
              </li>
              <li class="nav-item" v-if="isLogin">
                <button class="nav-link" @click="logOut">Logout</button>
              </li>
              <li class="nav-item" v-if="!isLogin">
                <router-link class="nav-link" :to="{ name: 'LoginView' }">Login</router-link>
              </li>
              <li class="nav-item" v-if="!isLogin">
                <router-link class="nav-link" :to="{ name: 'SignUpView' }">SignUp</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    getTrends () {
      this.$store.dispatch('getTrends', false)
    },
    logOut() {
      this.$store.commit('LOG_OUT')
      
    }
  },
  created() {
    this.getTrends()
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    username() {
      return this.$store.getters.username
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
