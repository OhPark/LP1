<template>
	<div>
		<li>
			<span class="review_elem">{{ review.title }}</span>
			<span class="review_elem">{{ review.score }}</span>
		</li>
	</div>
</template>

<script>
export default {
	props: {
		review: Object,
	}
}
</script>

<style scoped>
	.reveiw_elem {
		margin: 5px;
	}
</style>