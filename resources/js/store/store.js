import Vue from "vue";
import Vuex from "vuex";

import * as auth from "./modules/Auth";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        auth,
    }
});
