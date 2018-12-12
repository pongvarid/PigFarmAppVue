<template>
    <v-app id="app">
        <loading/>
        <router-view/>
    </v-app>
</template>

<script>
    import axios from "@/axios"
    import Loading from "./components/Share/Loading";

    export default {
        name: "App",
        components: {Loading},
        data: () => ({}),
        methods: {
            showLoad: async function () {
                await this.$store.dispatch("loading/showLoad")
            },
            dismissLoad: async function () {

                await this.$store.dispatch("loading/dismissLoad")
            }
        },
        async mounted() {
            let storage = window.localStorage
            if (storage.getItem('token')) {
                console.log(storage.getItem('token'));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.getItem('token');
                this.$router.replace({name : 'home'})
            }else{
                this.$router.replace({name : 'login'})
            }

         },
        created() {

            this.$on("before-request", this.showLoad);
            this.$on("request-error", this.dismissLoad);
            this.$on("after-response", this.dismissLoad);
            this.$on("response-error", this.dismissLoad);

            axios.interceptors.request.use(
                conf => {
                    this.$emit("before-request");
                    return conf;
                },
                error => {
                    this.$emit("request-error");
                    return Promise.reject(error);
                }
            );

            axios.interceptors.response.use(
                response => {
                    this.$emit("after-response");
                    return response;
                },
                error => {
                    this.$emit("response-error");
                    if (error.response.status == 401) {
                        this.$store.dispatch("login/logout")
                        this.$router.push({name: 'home'})
                    }
                    return Promise.reject(error);
                }
            );

        },
        beforeDestroy() {
            this.$off("before-request", this.showSpinner);
            this.$off("request-error", this.hideSpinner);
            this.$off("after-response", this.hideSpinner);
            this.$off("response-error", this.hideSpinner);
        }
    }
</script>
