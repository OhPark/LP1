<template>
	<div>
		<form @submit.prevent="createReview">
			<label for="title">제목 : </label>
			<input type="text" id="title" v-model.trim="title">
			<br>

			<label for="content">내용 : </label>
			<textarea type="text" id="content" v-model="content" />
			<br>

			<label for="dropdownMenuButton">점수 : </label>
			<input type="number" id="dropdownMenuButton" v-model="score">
			<!-- <button id="dropdownMenuButton" class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
			<select class="dropdown-menu" aria-labelledby="dropdownMenuButton" v-model="score">
				<option class="dropdown-item" value="0">0</option>
				<option class="dropdown-item" vlaue="1">1</option>
				<option class="dropdown-item" vlaue="2">2</option>
				<option class="dropdown-item" vlaue="3">3</option>
				<option class="dropdown-item" vlaue="4">4</option>
				<option class="dropdown-item" vlaue="5">5</option>
			</select> -->

			<input type="submit" value="Create">
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: null,
			content: null,
			score: null,

			movie_id: this.$route.params.movie_id,
		}
	},
	methods: {
		createReview () {
			const payload = {
				movie_id: this.movie_id,
				title: this.title,
				content: this.content,
				score: this.score
			}
			console.log('리뷰 만들기 컴포넌트')
			console.log(payload)
			this.$store.dispatch('createReview', payload)
				.then(() => {
				// this.$store.commit('NEW_MOVIE')
				this.$store.dispatch('getMovie', payload.movie_id)
			})
	}
	},
}
</script>

<style>

</style>