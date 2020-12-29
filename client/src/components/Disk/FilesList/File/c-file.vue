<template lang="pug">
    v-hover(v-slot='{ hover }')
        v-card(hover @click="OpenDirHandler").ma-2
            v-row
                v-col(cols="8")
                    v-icon {{ fileIcon }}
                    span {{file.name}}
                    span(v-if="hover").ml-4
                        v-btn(v-if="downloadIcon" @click="downloadClickHandler" icon color="primary")
                            v-icon get_app
                        v-btn(@click="deleteClickHandler" icon color="primary")
                            v-icon delete
                v-col(cols="2") {{file.date}}
                v-col(cols="2") {{sizeFormatter}}

</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "c-file",
        data: () => {
            return {};
        },
        components: {},
        props: {
            file: Object,
        },
        methods: {
            ...mapActions({
                CHANGE_CURRENT_DIR: "files/CHANGE_CURRENT_DIR",
                ADD_IN_STACK: "files/ADD_IN_STACK",
                DOWNLOAD_FILE: "files/DOWNLOAD_FILE",
                DELETE_FILE: "files/DELETE_FILE"
            }),
            OpenDirHandler() {
                if (this.file.type === "dir") {
                    this.ADD_IN_STACK(this.CURRENT_DIR)
                    this.CHANGE_CURRENT_DIR(this.file._id)
                }
            },
            downloadClickHandler(e) {
                e.stopPropagation()
                this.DOWNLOAD_FILE(this.file)
            },
            deleteClickHandler(e) {
                e.stopPropagation()
                this.DELETE_FILE(this.file)
            }
        },
        computed: {
            ...mapGetters({
                CURRENT_DIR: "files/CURRENT_DIR"
            }),
            fileIcon() {
                return this.file.type == "dir" ? "folder" : "description";
            },
            downloadIcon() {
                return this.file.type == "dir" ? false : true;
            },
            sizeFormatter() {
                if (this.file.size > 1024 * 1024 * 1024) {
                    return (this.file.size / (1024 * 1024 * 1024)).toFixed(1) + "Gb"
                }
                if (this.file.size > 1024 * 1024) {
                    return (this.file.size / (1024 * 1024)).toFixed(1) + "Mb"
                }
                if (this.file.size > 1024) {
                    return (this.file.size / (1024)).toFixed(1) + "Kb"
                }
                return this.file.size + "B"
            }
        },
    };
</script>

<style>
</style>
