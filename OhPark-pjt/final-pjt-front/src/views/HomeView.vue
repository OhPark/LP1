<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <!-- Slides with custom text -->
      <MovieCard v-for="trend in trends" :key="trend.id" :movie="trend" />
    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard'

export default {
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  components: {
    MovieCard
  },
  computed: {
    trends() {
      return this.$store.getters.trends
    }
  },
  methods: {
    onSlideStart() {
        this.sliding = true
    },
    onSlideEnd() {
        this.sliding = false
    }
  }
}

</script>

<style>

</style>