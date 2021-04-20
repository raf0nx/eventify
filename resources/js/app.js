require('./bootstrap');

import Vue from 'vue'
import Vuetify from '../plugins/vuetify'

import VueRouter from 'vue-router'
import router from './router/router'

Vue.use(VueRouter);

Vue.component('app', require('./components/App.vue').default);

const app = new Vue({
    el: '#app',
    router: new  VueRouter(router),
    vuetify: Vuetify
});
