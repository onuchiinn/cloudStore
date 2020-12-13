<template lang="pug">
v-layout
  v-app-bar(app)
    v-icon(large, color="primary") cloud
    v-spacer
    router-link(to="/55")
      v-btn(@click="LOGOUT") LOGOUT
  v-main
    v-container(fluid fill-height)
      router-view
  v-footer(app)
    v-card.text-center(flat, tile, width="100%")
      v-card-text
        .a CloudStore 2020 by Onuchin
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "c-empty-layout",
  components: {},
  methods: {
    ...mapActions({
      LOGOUT: "auth/LOGOUT",
    }),
  },
};
</script>

<style>
</style>
