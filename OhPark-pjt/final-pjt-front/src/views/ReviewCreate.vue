<template>
	<div>
		<form submit.prevent="createReview">
			<label for="title">제목 : </label>
			<input type="text" id="title" v-model="title">
			<br>

			<label for="content">내용 : </label>
			<input type="text" id="content" v-model="content">
			<br>

			<label for="dropdownMenuButton">점수 : </label>
			<button id="dropdownMenuButton" class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
			<select class="dropdown-menu" aria-labelledby="dropdownMenuButton" v-model="score">
				<option class="dropdown-item" vlaue="0">0</option>
				<option class="dropdown-item" vlaue="1">1</option>
				<option class="dropdown-item" vlaue="2">2</option>
				<option class="dropdown-item" vlaue="3">3</option>
				<option class="dropdown-item" vlaue="4">4</option>
				<option class="dropdown-item" vlaue="5">5</option>
			</select>

			<input type="submit" value="Create">
		</form>
	</div>
</template>

<script>
export default {
	date() {
		return {
			elem: {
				title: null,
				content: null,
				score: null,
			}
		}
	},
	methods: {
		createReview () {
      this.$store.dispatch('createReview', this.movie.id, elem)
    }
	}
}
</script>

<style>

</style>