<template>
	<div class="review">
		<li>
			<a class="title" @click="goToReview">제목: {{ review?.title }}</a>
			<span class="score">평점: {{ review?.score }}</span>
			<span class="user">작성자: {{ review?.user_name }}</span>
		</li>
	</div>
</template>

<script>
export default {
	props: {
		review: Object,
	},
	methods: {
		goToReview() {
			console.log(this.review)
			this.$store.dispatch('getReview', this.review.id)
			this.$router.push({ name: 'reviewDetail', params: { review_id : this.review.id } })
		}
	},
}
</script>

<style scoped>
	.review * {
		margin-inline: 10px;
	}
	.review .user {
		float: right;
	}
</style>