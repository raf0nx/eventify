import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import Auth from "@components/auth/Auth.vue";

describe("Auth.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const router = new VueRouter();
    let vuetify: Vuetify;
    let wrapper: Wrapper<Auth>;
    const welcomeText = "Welcome back!";


    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Auth, { localVue, vuetify, router });
    });

    it("should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("should contain welcome text", () => {
        expect(wrapper.html()).toContain(welcomeText);
    })
});