<template>
  <div>
    <h1>{{ profile.username }}</h1>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      username: null,
    }
  },
  computed: {
    profile() {
      return this.$store.getters.profile
    }
  },
  methods: {
    setProfile(username) {
      console.log("유저 이름", username)
      this.$store.dispatch('setProfile', username)
    },
  },
  created() {
    this.username = this.$route.params.username
    this.setProfile(this.username)
  },
}
</script>

<style>

</style>