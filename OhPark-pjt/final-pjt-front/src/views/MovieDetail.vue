<template>
  <div>
    <div v-if="is_fetched">
      {{ this.movie }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      movie_id: this.$route.params.movie_id,
    }
  },
  computed: {
    movie () {
      return this.$store.getters.movie
    }
  }
  // methods: {
  //   getMovie () {
  //     const options = {
  //       method: 'GET',
  //       url: `https://api.themoviedb.org/3/movie/${this.movie_id}`,
  //       params: {language: 'ko'},
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWZlZWJmZTk5YWU0MGRlNjhhZmIyYzYzMDNhZjY2NSIsInN1YiI6IjYzYzEwOWVkOGVmZTczMDA3ZDhmMjgzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fmZtOL8QkrT9vkl9HWLxwOYTNqmu1dqs5xf1R2yklmw'
  //       }
  //     }
  
  //     axios
  //       .request(options)
  //       .then(function (response) {
  //         console.log(response)
  //         this.movie = response.data
  //         this.is_fetched = true
  //       })
  //       .catch(function (error) {
  //         console.error(error)
  //       })
  //   }
  // },
  created() {

  }
}
</script>

<style>

</style>