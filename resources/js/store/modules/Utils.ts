import {
    Module,
    VuexModule,
    Mutation,
    Action,
    getModule
} from "vuex-module-decorators";

import store from "@/store/store";
import { SnackbarModel } from "@/models/Snackbar";
import { AlertModel } from "@/models/Alert";

export interface UtilsState {
    snackbarNotification: SnackbarModel;
    alertNotification: AlertModel;
    isLoading: boolean;
}

@Module({ dynamic: true, store, name: "utils" })
class Utils extends VuexModule implements UtilsState {
    snackbarNotification = new SnackbarModel();
    alertNotification = new AlertModel();
    isLoading = false;

    @Mutation
    private SET_ALERT(alert: AlertModel): void {
        this.alertNotification = alert;
    }

    @Mutation
    private SET_LOADING(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    @Mutation
    private SET_SNACKBAR(snackbar: SnackbarModel): void {
        this.snackbarNotification = snackbar;
    }

    @Action
    setAlert(alert: AlertModel): void {
        this.SET_ALERT(alert);
    }

    @Action
    setLoading(isLoading: boolean): void {
        this.SET_LOADING(isLoading);
    }

    @Action
    setSnackbar(snackbar: SnackbarModel): void {
        this.SET_SNACKBAR(snackbar);
    }

    get alert(): AlertModel {
        return this.alertNotification;
    }

    get loader(): boolean {
        return this.isLoading;
    }

    get snackbar(): SnackbarModel {
        return this.snackbarNotification;
    }
}

export const UtilsModule = getModule(Utils);
