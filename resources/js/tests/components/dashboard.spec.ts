import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";

import Dashboard from "@/components/main/Dashboard.vue";

describe("Dashboard.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Dashboard>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Dashboard, { localVue, vuetify });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });
});
