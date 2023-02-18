/* eslint-disable no-unused-vars */

import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    // {
    //     path: "/about-us",
    //     name: "AboutUs",
    //     component: () => import("../views/AboutUs.vue"),
    // },

];

const router = new VueRouter({
    mode: "history",
    routes,
    // Make sure browser resets to top position every page change
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});

export default router;
