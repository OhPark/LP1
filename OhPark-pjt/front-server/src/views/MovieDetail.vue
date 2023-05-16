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
      movie: null,
      is_fetched: false,
    }
  },
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
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${this.movie_id}`,
        params: {language: 'ko'},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWZlZWJmZTk5YWU0MGRlNjhhZmIyYzYzMDNhZjY2NSIsInN1YiI6IjYzYzEwOWVkOGVmZTczMDA3ZDhmMjgzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fmZtOL8QkrT9vkl9HWLxwOYTNqmu1dqs5xf1R2yklmw'
        }
      }
  
      axios
        .request(options)
        .then(function (response) {
          console.log(response)
          this.movie = response.data
          this.is_fetched = true
        })
        .catch(function (error) {
          console.error(error)
        })
  }
  // async mounted() {
  //   try {
  //     const params = {language: 'ko'}
  //     const headers = {
  //         accept: 'application/json',
  //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWZlZWJmZTk5YWU0MGRlNjhhZmIyYzYzMDNhZjY2NSIsInN1YiI6IjYzYzEwOWVkOGVmZTczMDA3ZDhmMjgzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fmZtOL8QkrT9vkl9HWLxwOYTNqmu1dqs5xf1R2yklmw'
  //     }
  //     const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.movie_id}`, {
  //       params: params,
  //       headers: headers
  //     })

  //     this.data = response.data
  //   } catch(err) {
  //     console.error(err)
  //   }
  // }
}
</script>

<style>

</style>