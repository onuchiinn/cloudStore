<template lang="pug">
    v-app
        component(:is="layout")
</template>

<script>
    import cEmptyLayout from "@/components/Layouts/c-empty-layout";
    import cMainLayout from "@/components/Layouts/c-main-layout";
    import {mapGetters} from "vuex";

    export default {
        name: "App",
        components: {
            cEmptyLayout,
            cMainLayout,
        },
        computed: {
            ...mapGetters({
                AUTH_STATUS: "auth/AUTH_STATUS",
            }),
            layout() {
                return "c-" + (this.$route.meta.layout || "empty") + "-layout";
            },
        },
        watch: {
            AUTH_STATUS() {
                return this.AUTH_STATUS ? this.$router.push({path: "/"}) : ""
            }
        },
        methods: {},
        created() {
        },
    };
</script>

<style>
</style>
