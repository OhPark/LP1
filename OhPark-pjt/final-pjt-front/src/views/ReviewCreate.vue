<template>
	<div>
		<form id="review-form" @submit.prevent="createReview">

			<input type="text" id="title" v-model.trim="title" placeholder="제목">
			<br>

			<textarea type="text" id="content" v-model="content" placeholder="내용" />
			<br>

			<div id="form-container" class="container">
					<div class="d-flex justify-content-center">
							<select class="form-control" v-model="score">
								<option value="0">0</option>
								<option vlaue="1">1</option>
								<option vlaue="2">2</option>
								<option vlaue="3">3</option>
								<option vlaue="4">4</option>
								<option vlaue="5">5</option>
							</select>
					</div>
			</div>


			<input id="submit" type="submit" value="생성하기">
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: null,
			content: null,
			score: 0,

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
					this.$router.go(-1)
				})
			
	}
	},
}
</script>

<style scoped>
#form-container {
	width: 70px;
}

#submit {
	margin: 10px;
	width: 100px;
}

#review-form {
	margin: 10px;
}

#content {
	margin: 10px;
	width: 200px;
	height: 200px
}


#title {
	margin: 10px;
	width: 200px
}


</style>