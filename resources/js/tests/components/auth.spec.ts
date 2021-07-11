import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import Auth from "@components/auth/Auth.vue";

const WELCOME_TEXT = "Welcome back!";

describe("Auth.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const router = new VueRouter();
    let vuetify: Vuetify;
    let wrapper: Wrapper<Auth>;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Auth, { localVue, vuetify, router });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should contain welcome text", () => {
        const header = wrapper.find("h2");
        expect(header.text()).toEqual(WELCOME_TEXT);
    });
});
