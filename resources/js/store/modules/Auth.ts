import {
    Module,
    VuexModule,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";

import store from "@/store/store";
import router from "@/routes/router";
import AuthService from "@/services/AuthService";
import { User } from "@/models/User";

export interface AuthState {
    user: User | null;
}

@Module({ dynamic: true, store, name: "auth" })
class Auth extends VuexModule implements AuthState {
    public user: User | null = null;

    @Mutation
    private SET_USER(userPayload: User | null): void {
        this.user = userPayload;
    }
    @Action
    public async getAuthUser(): Promise<User | null> {
        try {
            const authUser = await AuthService.getAuthUser();
            this.SET_USER(authUser.data);
            return authUser.data;
        } catch (error) {
            this.SET_USER(null);
            return null;
        }
    }

    @Action
    public async logout(): Promise<void> {
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

    public get authUser(): User | null {
        return this.user;
    }
}

export const AuthModule = getModule(Auth);
