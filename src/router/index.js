
import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    {
        path: "/Seasonality",
        name: "Seasonality",
        component: () => import("../views/Seasonality/Seasonality.vue"),
    },
    {
        path: "/jobseeker/signin",
        name: "JobSeekerSignIn",
        component: () => import("../views/Entry/Signin.vue"),
    },
    {
        path: "/jobseeker/forget-password",
        name: "JobSeekerForgetPassword",
        component: () => import("../views/Entry/ForgetPassword.vue"),
    },
    {
        path: "/jobseeker/reset-password",
        name: "JobSeekerResetPassword",
        component: () => import("../views/Entry/ResetPassword.vue"),
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
