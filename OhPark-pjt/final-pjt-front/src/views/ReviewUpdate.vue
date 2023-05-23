<template>
	<div>
		<form @submit.prevent="reviewUpdate">
			<label for="title">제목 : </label>
			<input type="text" id="title" v-model="review.title">
			<br>

			<label for="content">내용 : </label>
			<input type="text" id="content" v-model="review.content">
			<br>

			<label for="dropdownMenuButton">점수 : </label>
			<input type="number" id="dropdownMenuButton" v-model="review.score">
			<!-- <button id="dropdownMenuButton" class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
			<select class="dropdown-menu" aria-labelledby="dropdownMenuButton" v-model="score">
				<option class="dropdown-item" vlaue="0">0</option>
				<option class="dropdown-item" vlaue="1">1</option>
				<option class="dropdown-item" vlaue="2">2</option>
				<option class="dropdown-item" vlaue="3">3</option>
				<option class="dropdown-item" vlaue="4">4</option>
				<option class="dropdown-item" vlaue="5">5</option>
			</select> -->

			<input type="submit" value="Update">
		</form>
	</div>
</template>

<script>
export default {
	computed: {
		review() {
			return this.$store.getters.review
		}
	},
	methods: {
		reviewUpdate() {
			console.log(this.review)
			this.$store.dispatch('updateReview', this.review)
				.then(() => {
					this.$router.push({name: 'reviewDetail', params: { review_id : this.review.id }})
				})
		},
	}
}
</script>

<style>

</style>