<template>
  <div>
    <h1>{{ username }}</h1>
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
  methods: {
    setProfile() {
      const username = this.username
      console.log(username)
      this.$store.dispatch('setProfile', username)
    },
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.setProfile('setProfile', payload)
  },
}
</script>

<style>

</style>