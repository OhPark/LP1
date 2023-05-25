<template>
  <div id="app">

      <nav class="navbar navbar-light bg-light justify-content-between">
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
          <form class="form-inline" @submit.prevent="searchMovies">  
            <input class="form-control mr-sm-2" type="search" placeholder="영화 검색" aria-label="Search" v-model="keyword">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <b-nav-item-dropdown text="User" right>
              <b-dropdown-item v-if="isLogin" class="dropdown-item" :to="{ name: 'ProfileView', params: {username: username} }">Profile</b-dropdown-item>
              <b-dropdown-item v-if="isLogin" class="dropdown-item" @click="logOut">Logout</b-dropdown-item>
              <b-dropdown-item v-if="!isLogin" class="dropdown-item" :to="{ name: 'LoginView' }">Login</b-dropdown-item>
              <b-dropdown-item v-if="!isLogin" class="dropdown-item" :to="{ name: 'SignUpView' }">SignUp</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </nav>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  methods: {
    getTrends () {
      this.$store.dispatch('getTrends', true)
    },
    logOut() {
      this.$store.commit('LOG_OUT')
      
    },
    searchMovies() {
      console.log('들어옴?')
      // if(this.$route.path !== '/movies/:keyword') {
        this.$router.replace({name : 'movieSearch', params: {keyword: this.keyword}})
      // } else {
      //   this.$router.go(0)
      // }
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
  },
  data() {
    return {
      keyword: null
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

input.form-control {
  text-align: center;
  margin-bottom: 5px;
}

li {
  list-style-type: none;
}
</style>
