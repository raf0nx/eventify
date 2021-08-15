import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import Dashboard from "@/components/dashboard/Dashboard.vue";
import { Event } from "@/tests/constans/Event";

jest.mock("axios");

describe("Dashboard.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Dashboard>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        // @ts-ignore
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: Event })
        );
        wrapper = shallowMount(Dashboard, { localVue, vuetify });
    });

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get events from API", () => {
        // Assert
        // @ts-ignore
        expect(wrapper.vm.events).toEqual(Event);
    });
});
