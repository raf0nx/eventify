import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";
import Home from "../components/main/Home";
import Auth from "../components/auth/Auth";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyEmail from "../components/auth/VerifyEmail";
import ErrorPage from "../components/error/ErrorPage";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home",
        meta: { requiresAuth: true }
    },
    {
        path: "/auth",
        component: Auth,
        name: "Auth",
        children: [
            {
                path: "login",
                component: Login,
                name: "Login"
            },
            {
                path: "register",
                component: Register,
                name: "Register"
            }
        ]
    },
    {
        path: "/verify-email",
        component: VerifyEmail,
        name: "VerifyEmail",
        meta: { requiresAuth: true }
    },
    {
        path: "*",
        component: ErrorPage,
        name: "ErrorPage"
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
    linkActiveClass: "font-weight-bold",
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeEach(async (to, _, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters["auth/authUser"]) {
            next();
        } else {
            await store.dispatch("auth/getAuthUser");
            store.getters["auth/authUser"] ? next() : next({ name: "Login" });
        }
    } else {
        next();
    }
});

router.afterEach((_, _2) => {
    const authUser = store.getters["auth/authUser"];
    if (authUser) {
        store.commit(
            "auth/SET_ALERT",
            !authUser.email_verified_at ? true : false
        );
    }
});

export default router;
