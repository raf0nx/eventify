require("./bootstrap");

import Vue from "vue";
import Vuetify from "../plugins/vuetify";

import router from "./router/router";
import store from "./store/store";

Vue.component("app", require("./components/App.vue").default);

new Vue({
    el: "#app",
    router,
    store,
    vuetify: Vuetify
});
