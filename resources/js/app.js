require('./bootstrap');

import Vue from 'vue'
import Vuetify from '../plugins/vuetify'

Vue.component('app', require('./components/App.vue').default);

const app = new Vue({
    el: '#app',
    vuetify: Vuetify
});
