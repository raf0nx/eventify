import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { AuthModule } from "@modules/Auth";
import { UtilsModule } from "@modules/Utils";
import Dashboard from "@/components/main/Dashboard.vue";
import Auth from "@components/auth/Auth.vue";
import Login from "@components/auth/Login.vue";
import Register from "@components/auth/Register.vue";
import ErrorPage from "@components/error/ErrorPage.vue";
import { AlertModel } from "@/models/Alert";
import { EnumAlertType } from "@/enums/EnumAlertType";
import AlertCallbacks from "@/utils/alertCallbacks";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        component: Dashboard,
        name: "Dashboard",
        meta: { requiresAuth: true }
    },
    {
        path: "/auth",
        component: Auth,
        name: "Auth",
        meta: { preventAuthUser: true },
        children: [
            {
                path: "login",
                component: Login,
                name: "Login",
                meta: { preventAuthUser: true }
            },
            {
                path: "register",
                component: Register,
                name: "Register",
                meta: { preventAuthUser: true }
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
        return savedPosition ?? { x: 0, y: 0 };
    }
});

router.beforeEach(async (to, _, next) => {
    const authenticatedUser =
        AuthModule.authUser ?? (await AuthModule.getAuthUser());
    if (to.matched.some(record => record.meta.requiresAuth)) {
        authenticatedUser ? next() : next({ name: "Login" });
    } else {
        to.matched.some(record => record.meta.preventAuthUser) &&
        authenticatedUser
            ? next({ name: "Dashboard" })
            : next();
    }
});

router.afterEach((_, _2) => {
    const authUser = AuthModule.authUser;
    if (authUser) {
        UtilsModule.setAlert(
            authUser.email_verified_at
                ? new AlertModel()
                : new AlertModel()
                      .setShowAlert(true)
                      .setMessage(
                          "Email not verified! Check your inbox at " +
                              AuthModule.authUser?.email
                      )
                      .setType(EnumAlertType.WARNING)
                      .setCallback(AlertCallbacks.resendVerificationLink)
                      .setBtnText("Resend link")
        );
    } else {
        UtilsModule.setAlert(new AlertModel());
    }
});

export default router;
