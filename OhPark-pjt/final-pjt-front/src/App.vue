<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-sm">
        <div class="container-fluid">
          <img class="navbar-brand" src="#">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'random' }">Random</router-link>
              </li> -->
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'community' }">Community</router-link>
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
      this.$store.dispatch('getTrends')
    }
  },
  created() {
    console.log(this.$store.state.trends)
    this.getTrends()
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
