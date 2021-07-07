import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import App from "@components/App.vue";

describe("App.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);

    const router = new VueRouter();
    let vuetify: Vuetify;
    let wrapper: Wrapper<App>;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    it("should match the snapshot", () => {
        wrapper = shallowMount(App, { localVue, vuetify, router });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Display snackbar message when the resend link button is clicked", async () => {
        wrapper = shallowMount(App, { localVue, vuetify, router });
        await wrapper.find(".v-btn").trigger("click");

        expect(wrapper.html()).toContain(
            "Verification Link resend successfully!"
        );
    });
});
