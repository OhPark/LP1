<template>
	<div>
		<div class="review">
			<p>글 번호: {{review?.id}}</p>
			<p>제목: {{ review?.title }}</p>
			<p>작성자: {{ review?.user_name }}</p>
			<p>내용: {{ review?.content }}</p>
			<p>평점: {{ review?.score }}</p>
			<p>생성 일시: {{ review?.created_at }}</p>
			<p>작성 일시: {{ review?.updated_at }}</p>
		</div>
		<div class="drf">
			<button @click="goToReviewUpdate">수정</button>
			<button @click="reviewDelete">삭제</button>
		</div>
		<div class="return-movie">
			<button @click="returnToMovie(movie_id)">영화로 돌아가기</button>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		review() {
			return this.$store.getters.review
		},
		movie_id() {
			return this.$store.getters.movie.id
		}
	},
	methods: {
		goToReviewUpdate() {
			this.$router.push({name : 'reviewUpdate', params: { review_id : this.review.id }})
		},
		reviewDelete() {
			const review_id = this.review.id
			console.log(review_id)
			this.$store.dispatch('deleteReview', review_id)
				.then(() => this.returnToMovie(this.movie_id))
		},
		returnToMovie(movie_id) {
			this.$store.dispatch('getMovie', movie_id)
		}
	},
}
</script>

<style>

</style>