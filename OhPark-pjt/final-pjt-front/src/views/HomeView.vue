<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
    <MovieCard v-for="trend in trends" :key="trend.id" :movie="trend" />
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard'

export default {
  components: {
    MovieCard
  },
  computed: {
    trends() {
      return this.$store.getters.trends
    }
  },
}

</script>

<style>

</style>