
import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    {
        path: "/Seasonality",
        name: "Seasonality",
        component: () => import("../views/Seasonality/Seasonality.vue"),
    },

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
