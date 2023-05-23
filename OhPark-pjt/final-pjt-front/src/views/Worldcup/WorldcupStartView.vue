<template>
	<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
		<div class="card-1 col-3">
			<MovieCard />
		</div>
		<div class="card-2 col-8">
			<MovieCard />
		</div>
	</div>
</template>

<script>
import MovieCard from '@/components/MovieCard'

export default {
  components: {
    MovieCard
  },
	// computed: {
	// 	seleted() {
	// 		this.$store.getters.seletedMovies
	// 	},
	// 	ready() {
	// 		this.$store.getters.readyMovies
	// 	}
	// },
	methods: {
		
	}

}
</script>

<style>

</style>