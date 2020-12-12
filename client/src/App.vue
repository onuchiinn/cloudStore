<template lang="pug">
v-app
  component(:is="layout")
</template>

<script>
import { mapActions } from "vuex";
import cEmptyLayout from "@/components/Layouts/c-empty-layout";
import cMainLayout from "@/components/Layouts/c-main-layout";
export default {
  name: "App",
  components: {
    cEmptyLayout,
    cMainLayout,
  },
  computed: {
    layout() {
      return "c-" + (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  methods: {
    ...mapActions({
      AUTH: "auth/AUTH",
    }),
  },
  created() {
    this.AUTH()
  },
};
</script>

<style>
</style>
