import Vue from "vue";
import Vuex from "vuex";

import * as alert from "./modules/Alert";
import * as auth from "./modules/Auth";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        auth,
        alert
    }
});
