<template lang="pug">
    v-row
        v-col(cols="8") Название
        v-col(cols="2") Дата
        v-col(cols="2") Размер
        v-col(cols="12" align-self="center").text-center
            v-progress-circular(
                v-if="LOADER"
                :size="50"
                color="primary"
                indeterminate)
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "c-file-list",
        components: {},
        computed: {
            ...mapGetters({
                FILES: "files/FILES",
                LOADER: "files/LOADER"
            })
        }
    };
</script>

<style>
</style>
