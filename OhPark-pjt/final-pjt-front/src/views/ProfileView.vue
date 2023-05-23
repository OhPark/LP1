<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  methods: {
    setProfile() {
      this.$store.dispatch('setProfile', this.user)
    },
  },
}
</script>

<style>

</style>