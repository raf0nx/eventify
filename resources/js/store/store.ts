import Vue from "vue";
import Vuex from "vuex";

import { AuthState } from "./modules/Auth";
import { UtilsState } from "./modules/Utils";

Vue.use(Vuex);

export interface RootState {
    auth: AuthState;
    utils: UtilsState;
}

export default new Vuex.Store<RootState>({});
