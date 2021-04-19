require('./bootstrap');

import Vue from 'vue'
import Vuetify from 'vuetfy'

Vue.use(Vuetify);

import App from './components/App.vue'

const app = new Vue({
    el: '#app',
    components: App,
    vuetify: new Vuetify()
});
