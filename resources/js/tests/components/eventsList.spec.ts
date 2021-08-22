import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import EventsList from "@/components/dashboard/event/EventsList.vue";
import { Event } from "@/tests/constans/Event";

jest.mock("axios");

describe("EventsList.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<EventsList>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        // @ts-ignore
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: Event })
        );
        wrapper = shallowMount(EventsList, { localVue, vuetify });
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
