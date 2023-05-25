<template>
	<div>
		<div v-if="search">
			<MovieCard v-for="(result, idx) in search" :key="idx" :movie="result" />
		</div>
		<div v-if="search">
			검색하신 키워드를 포함하는 영화가 없습니다.
		</div>
	</div>
</template>

<script>
import MovieCard from '@/components/MovieCard'

export default {
	data() {
		return {
			keyword: this.$route.params.keyword
		}
	},
	components: {
    MovieCard,
  },
	computed: {
		search() {
			return this.$store.getters.search
		},
	},
	created() {
		this.$store.dispatch('searchMovies', this.keyword)
	}
}
</script>

<style>

</style>