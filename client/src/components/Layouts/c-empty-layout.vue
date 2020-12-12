<template lang="pug">
v-layout
  v-app-bar(app)
    v-icon(large color="primary") cloud
    v-spacer
    router-link(to="login") 
      v-btn AUTH
    router-link(to="sign-up")
      v-btn SIGN-UP
  v-main
    v-container(fluid fill-height)
      router-view
</template>

<script>
export default {
  name: "c-empty-layout",
  components: {},
};
</script>

<style>
</style>
