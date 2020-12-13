<template lang="pug">
    v-card(hover @click="OpenDirHandler").ma-2
        v-row
            v-col(cols="8")
                v-icon {{ fileIcon }}
                span {{file.name}}
            v-col(cols="2") {{file.date}}
            v-col(cols="2") {{file.size}} GB
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

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
        methods: {
            ...mapActions({
                CHANGE_CURRENT_DIR: "files/CHANGE_CURRENT_DIR",
                ADD_IN_STACK: "files/ADD_IN_STACK"
            }),

            OpenDirHandler() {
                if(this.file.type === "dir") {
                    this.ADD_IN_STACK(this.CURRENT_DIR)
                    this.CHANGE_CURRENT_DIR(this.file._id)
                }
            },
        },
        computed: {
            ...mapGetters({
                CURRENT_DIR: "files/CURRENT_DIR"
            }),
            fileIcon() {
                return this.file.type == "dir" ? "folder" : "description";
            },
        },
    };
</script>

<style>
</style>
