import {
    Module,
    VuexModule,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";

import store from "@/store/store.ts";
import router from "@/routes/router.ts";
import * as AuthService from "@/services/AuthService.ts";

export interface AuthState {
    user: any;
}

@Module({ dynamic: true, store, name: "auth" })
class Auth extends VuexModule implements AuthState {
    public user: any = null;

    @Mutation
    private SET_USER(userPayload: any) {
        this.user = userPayload;
    }
    @Action
    public async getAuthUser() {
        try {
            const authUser = await AuthService.getAuthUser();
            this.SET_USER(authUser.data);
            return authUser.data;
        } catch (error) {
            this.SET_USER(null);
        }
    }

    @Action
    public async logout() {
        try {
            await AuthService.logout();
            this.SET_USER(null);
            if (router.currentRoute.name !== "Login") {
                router.push({ name: "Login" });
            }
        } catch (error) {
            console.log(error);
        }
    }

    public get authUser() {
        return this.user;
    }
}

export const AuthModule = getModule(Auth);
