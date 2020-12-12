<template lang="pug">
v-card
  v-row
    v-btn.mx-2
      v-icon undo
      span BACK
    v-btn.mx-2
      v-icon create_new_folder
      span Create new dir
  cFileList
  cFile(v-for="(item, index) in FILES", :key="index", :file="item")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import cFileList from "./FilesList/c-file-list";
import cFile from "./FilesList/File/c-file";
export default {
  name: "c-disk",
  data: () => {
    return {};
  },
  components: {
    cFileList,
    cFile,
  },
  methods: {
    ...mapActions({
      GET_FILES: "files/GET_FILES",
    }),
  },
  computed: {
    ...mapGetters({
      FILES: "files/FILES",
      CURRENT_DIR: "files/CURRENT_DIR",
    }),
  },
  created() {
    this.GET_FILES();
  },
  watch: {
    CURRENT_DIR() {
      this.GET_FILES();
    },
  },
};
</script>

<style>
</style>
