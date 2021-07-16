import {
    Module,
    VuexModule,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";

import store from "@/store/store";
import { SnackbarModel } from "@/models/Snackbar";

export interface UtilsState {
    snackbarNotification: SnackbarModel;
    showAlert: boolean;
    isLoading: boolean;
}

@Module({ dynamic: true, store, name: "utils" })
class Utils extends VuexModule implements UtilsState {
    snackbarNotification = new SnackbarModel();
    showAlert = false;
    isLoading = false;

    @Mutation
    private SET_ALERT(setAlert: boolean): void {
        this.showAlert = setAlert;
    }

    @Mutation
    private SET_LOADING(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    @Mutation
    private SET_SNACKBAR(snackbarPayload: SnackbarModel): void {
        this.snackbarNotification = snackbarPayload;
    }

    @Action
    setAlert(setAlert: boolean): void {
        this.SET_ALERT(setAlert);
    }

    @Action
    setLoading(isLoading: boolean): void {
        this.SET_LOADING(isLoading);
    }

    @Action
    setSnackbar(snackbarPayload: SnackbarModel): void {
        this.SET_SNACKBAR(snackbarPayload);
    }

    get alert(): boolean {
        return this.showAlert;
    }

    get loader(): boolean {
        return this.isLoading;
    }

    get snackbar(): SnackbarModel {
        return this.snackbarNotification;
    }
}

export const UtilsModule = getModule(Utils);
