import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { AuthModule } from "../store/modules/Auth";
import { UtilsModule } from "../store/modules/Utils";
import store from "../store/store";
import Home from "../components/main/Home.vue";
import Auth from "../components/auth/Auth.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import ErrorPage from "../components/error/ErrorPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
        if (AuthModule.authUser) {
            next();
        } else {
            await AuthModule.getAuthUser();
            AuthModule.authUser ? next() : next({ name: "Login" });
        }
    } else {
        next();
    }
});

router.afterEach((_, _2) => {
    const authUser = AuthModule.authUser;
    if (authUser) {
        UtilsModule.setAlert(authUser.email_verified_at ? false : true);
    } else {
        UtilsModule.setAlert(false);
    }
});

export default router;