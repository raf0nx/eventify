import Auth from "@components/auth/Auth.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import { createLocalVue, mount } from "@vue/test-utils";

describe("Auth.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter();
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    it("should work", () => {
        const wrapper = mount(Auth, { localVue, vuetify, router });
        expect(wrapper.html()).toMatchSnapshot();
    });
});