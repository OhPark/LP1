<template>
	<div>
		<form @submit.prevent="reviewUpdate">
			<label for="title">제목 : </label>
			<input type="text" id="title" v-model.trim="review.title">
			<br>

			<label for="content">내용 : </label>
			<input type="text" id="content" v-model="review.content">
			<br>

			<label for="score">점수 : </label>
			<input type="number" id="score" v-model="review.score">

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