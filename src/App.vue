<template>
    <div>
        <!-- APP VIEW -->
        <Header class="header"/>
        <body class="body">
            <div class="page-container">
                <!-- LANDING BACKGROUND IMAGE CAROUSEL -->
                <router-view class="main-content"></router-view>
            </div>
        </body>
        <Footer class="footer"/>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";

    export default {
        name: 'App',
        components: {
            Header, Footer
        },

        data() {
            return {

            }
        },

        created() {

            this.$store.dispatch("setDistrictData")
            this.$store.dispatch("setCropData")
            this.$store.dispatch("setSeasonalityData")

        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
