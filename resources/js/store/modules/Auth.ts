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
import { UtilsModule } from "./Utils";
import { SnackbarModel } from "@/models/Snackbar";
import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";

export interface AuthState {
    user: User | null;
}

@Module({ dynamic: true, store, name: "auth" })
class Auth extends VuexModule implements AuthState {
    user: User | null = null;

    @Mutation
    private SET_USER(userPayload: User | null): void {
        this.user = userPayload;
    }
    @Action
    async getAuthUser(): Promise<User | null> {
        try {
            const authUser = await AuthService.getAuthUser();
            this.SET_USER(authUser.data);
            return authUser.data;
        } catch {
            this.SET_USER(null);
            UtilsModule.setSnackbar(
                new SnackbarModel()
                    .setShowSnackbar(true)
                    .setMessage(
                        "You are not authenticated! Reload the page and try to login again."
                    )
                    .setColor(EnumSnackbarColor.ERROR)
                    .setIcon(EnumSnackbarIcon.ERROR)
            );
            return null;
        }
    }

    @Action
    async logout(): Promise<void> {
        try {
            await AuthService.logout();
            this.SET_USER(null);
            router.push({ name: "Login" });
        } catch {
            UtilsModule.setSnackbar(
                new SnackbarModel()
                    .setShowSnackbar(true)
                    .setMessage("Cannot log you out, please reload the page.")
                    .setColor(EnumSnackbarColor.ERROR)
                    .setIcon(EnumSnackbarIcon.ERROR)
            );
        }
    }

    get authUser(): User | null {
        return this.user;
    }
}

export const AuthModule = getModule(Auth);
