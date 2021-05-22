import {
    Module,
    VuexModule,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";

import store from "@/store/store.ts";

export interface UtilsState {
    snackbarNotification: object;
    showAlert: boolean;
    isLoading: boolean;
}

@Module({ dynamic: true, store, name: "utils" })
class Utils extends VuexModule implements UtilsState {
    public snackbarNotification = {};
    public showAlert: boolean = false;
    public isLoading: boolean = false;

    @Mutation
    private SET_ALERT(setAlert: boolean) {
        this.showAlert = setAlert;
    }

    @Mutation
    private SET_LOADING(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    @Mutation
    private SET_SNACKBAR(snackbarPayload: object) {
        this.snackbarNotification = snackbarPayload;
    }

    @Action
    public setAlert(setAlert: boolean) {
        this.SET_ALERT(setAlert);
    }

    @Action
    public setLoading(isLoading: boolean) {
        this.SET_LOADING(isLoading);
    }

    @Action
    setSnackbar(snackbarPayload: any) {
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

    get alert(): boolean {
        return this.showAlert;
    }

    get loader(): boolean {
        return this.isLoading;
    }

    get snackbar(): object {
        return this.snackbarNotification;
    }
}

export const UtilsModule = getModule(Utils);
