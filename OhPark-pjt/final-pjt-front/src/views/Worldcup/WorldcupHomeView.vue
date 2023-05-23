<template>
	<div>
		<button class="start" @click="startWorldcup">
			시작하기
		</button>
	</div>
</template>

<script>
import * as _ from 'lodash'

export default {
	methods: {
		startWorldcup() {
			this.$store.commit("FREE_WORLDCUP")
			this.$store.dispatch('setWorldcup')	
			this.$router.replace({name: 'WorldcupStart'})
		}
	}
}
</script>

<style>

</style>