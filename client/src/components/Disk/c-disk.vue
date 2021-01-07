<template lang="pug">
    v-card(v-if="!dragEnter",
        min-height="100%",
        min-width="100%",
        @dragenter.stop.prevent="dragEnterHandler",
        @dragleave.stop.prevent="dragLeaveHandler",
        @dragover.stop.prevent="dragEnterHandler")
        v-row.align-center
            v-col(cols="4")
                v-btn(v-if="DIR_STACK.length" @click="clickBackHandler").mx-2
                    v-icon undo
                    span Назад
                v-dialog(v-model='dialog' width='500' persistent)
                    template(v-slot:activator='{ on, attrs }')
                        v-btn(v-bind='attrs' v-on='on').mx-2
                            v-icon create_new_folder
                            span Создать новую папку
                    v-card
                        .d-flex
                            v-card-title Создать новую папку
                            v-spacer
                            v-card-actions
                                v-btn(icon, @click="dialog = false")
                                    v-icon close
                        v-text-field(label="Введите название папки" v-model="folderName").mx-4
                        v-card-actions
                            v-spacer
                            v-btn(text @click="createDirHandler") Создать
            v-spacer
            v-col(cols="3").mx-2
                v-file-input(label="Загрузить файлы"
                    hide-details
                    dense
                    outlined
                    reverse
                    chips
                    small-chips
                    multiple
                    prepend-icon="attach_file"
                    @change="fileUploadHandler($event)")
            v-col(cols="4").mx-2
                v-select(:items=`[{value: 'name', dispName:'По имени'},
                              {value: 'type', dispName:'По типу'},
                              {value: 'date', dispName:'По дате'}]`,
                    item-text="dispName",
                    item-value="value",
                    v-model="sort",
                    label="Сортировка",
                    @change="clickSortHandler")

        c-file-list
        .red--text.text-center(v-if="FILES.length === 0" cols="12") Файлы не найдены.
        transition-group(appear name="fade", mode="out-in")
            c-file(v-for="(item, index) in FILES", :key="index+'file'", :file="item")
    v-card(v-else
    outlined
    rounded
    min-height="100%"
        min-width="100%"
        @dragenter.stop.prevent="dragEnterHandler",
        @dragleave.stop.prevent="dragLeaveHandler",
        @dragover.stop.prevent="dragEnterHandler",
        @drop.stop.prevent="dropHandler").d-flex.align-center.justify-center
        .aa Drop it
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import cFileList from "./FilesList/c-file-list";
    import cFile from "./FilesList/File/c-file";

    export default {
        name: "c-disk",
        data: () => {
            return {
                dialog: false,
                folderName: "",
                dragEnter: false,
                sort: "type"
            };
        },
        components: {
            cFileList,
            cFile
        },
        methods: {
            ...mapActions({
                GET_FILES: "files/GET_FILES",
                CREATE_DIR: "files/CREATE_DIR",
                CHANGE_CURRENT_DIR: "files/CHANGE_CURRENT_DIR",
                UPLOAD_FILE: "files/UPLOAD_FILE"
            }),
            createDirHandler() {
                this.CREATE_DIR({dirId: this.CURRENT_DIR, name: this.folderName})
                this.dialog = false
                this.folderName = null
            },
            clickBackHandler() {
                const dirId = this.DIR_STACK.pop()
                this.CHANGE_CURRENT_DIR(dirId)
            },
            clickSortHandler() {
                this.GET_FILES({dir: this.CURRENT_DIR, sort: this.sort});
            },
            fileUploadHandler(files) {
                files.forEach(file => this.UPLOAD_FILE({file, dirId: this.CURRENT_DIR}))
            },
            dragEnterHandler() {
                this.dragEnter = true

            },
            dragLeaveHandler() {
                this.dragEnter = false
            },
            dropHandler(event) {
                let files = [...event.dataTransfer.files]
                files.forEach(file => this.UPLOAD_FILE({file, dirId: this.CURRENT_DIR}))
                this.dragEnter = false
            }
        },
        computed: {
            ...mapGetters({
                FILES: "files/FILES",
                CURRENT_DIR: "files/CURRENT_DIR",
                DIR_STACK: "files/DIR_STACK",
                INFORM_MESSAGE: "auth/INFORM_MESSAGE"
            }),
        },
        created() {
            this.GET_FILES({dir: this.CURRENT_DIR, sort: this.sort});
        },
        watch: {
            CURRENT_DIR() {
                this.GET_FILES({dir: this.CURRENT_DIR, sort: this.sort});
            },
        },
    };
</script>

<style>
</style>
