import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import Dashboard from "@/components/dashboard/Dashboard.vue";

jest.mock("axios");

describe("Dashboard.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter();
    let wrapper: Wrapper<Dashboard>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        // @ts-ignore
        wrapper = shallowMount(Dashboard, { localVue, vuetify, router });
    });

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });
});
