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
    navDrawer: boolean;
}

@Module({ dynamic: true, store, name: "utils" })
class Utils extends VuexModule implements UtilsState {
    snackbarNotification = new SnackbarModel();
    alertNotification = new AlertModel();
    isLoading = false;
    navDrawer = false;

    @Mutation
    private SET_ALERT(alert: AlertModel): void {
        this.alertNotification = alert;
    }

    @Mutation
    private SET_LOADER(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    @Mutation
    private SET_SNACKBAR(snackbar: SnackbarModel): void {
        this.snackbarNotification = snackbar;
    }

    @Mutation
    private SET_NAV_DRAWER(setNavDrawer: boolean): void {
        this.navDrawer = setNavDrawer;
    }

    @Action
    setAlert(alert: AlertModel): void {
        this.SET_ALERT(alert);
    }

    @Action
    setLoader(isLoading: boolean): void {
        this.SET_LOADER(isLoading);
    }

    @Action
    setSnackbar(snackbar: SnackbarModel): void {
        this.SET_SNACKBAR(snackbar);
    }

    @Action
    setNavDrawer(setNavDrawer: boolean): void {
        this.SET_NAV_DRAWER(setNavDrawer);
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

    get isNavDrawer(): boolean {
        return this.navDrawer;
    }
}

export const UtilsModule = getModule(Utils);
