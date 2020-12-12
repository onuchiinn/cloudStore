<template lang="pug">
v-card(hover).ma-2
  v-row
    v-col(cols="8")
      v-icon {{ fileIcon }}
      span {{file.name}}
    v-col(cols="2") {{file.date}}
    v-col(cols="2") 1024GB
</template>

<script>
export default {
  name: "c-file",
  data: () => {
    return {
    };
  },
  components: {},
  props: {
    file: Object,
  },
  computed: {
    fileIcon() {
      return this.file.type == "dir" ? "folder" : "description";
    },
  },
};
</script>

<style>
</style>
