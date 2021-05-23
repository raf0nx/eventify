import {
    Module,
    VuexModule,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";

import store from "@/store/store";

export interface Snackbar {
    showSnackbar: boolean;
    message: string | null;
}
export interface UtilsState {
    snackbarNotification: Snackbar;
    showAlert: boolean;
    isLoading: boolean;
}

@Module({ dynamic: true, store, name: "utils" })
class Utils extends VuexModule implements UtilsState {
    public snackbarNotification: Snackbar = {
        showSnackbar: false,
        message: null
    };
    public showAlert = false;
    public isLoading = false;

    @Mutation
    private SET_ALERT(setAlert: boolean): void {
        this.showAlert = setAlert;
    }

    @Mutation
    private SET_LOADING(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    @Mutation
    private SET_SNACKBAR(snackbarPayload: Snackbar): void {
        this.snackbarNotification = snackbarPayload;
    }

    @Action
    public setAlert(setAlert: boolean): void {
        this.SET_ALERT(setAlert);
    }

    @Action
    public setLoading(isLoading: boolean): void {
        this.SET_LOADING(isLoading);
    }

    @Action
    public setSnackbar(snackbarPayload: Snackbar): void {
        this.SET_SNACKBAR(snackbarPayload);
        setTimeout(
            () =>
                this.SET_SNACKBAR({
                    showSnackbar: false,
                    message: null
                }),
            4000
        );
    }

    public get alert(): boolean {
        return this.showAlert;
    }

    public get loader(): boolean {
        return this.isLoading;
    }

    public get snackbar(): Snackbar {
        return this.snackbarNotification;
    }
}

export const UtilsModule = getModule(Utils);
