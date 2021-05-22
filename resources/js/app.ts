import "./bootstrap";

import Vue from "vue";
import Vuetify from "./plugins/vuetify";

import App from "@components/App.vue";
import store from "./store/store";
import router from "./routes/router";
import "./utils/validation.ts";

Vue.component("app", App);

new Vue({
    el: "#app",
    store,
    router,
    vuetify: Vuetify
});
