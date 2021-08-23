import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import EventDetails from "@components/dashboard/event_details/EventDetails.vue";
import { Event } from "@/tests/constans/Event";

jest.mock("axios");

describe("EventDetails.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<EventDetails>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();

        // @ts-ignore
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: Event })
        );

        wrapper = shallowMount(EventDetails, {
            localVue,
            vuetify,
            mocks: { $route: { params: { id: Event.id } } }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get event id from route params", () => {
        // Assert
        expect(wrapper.vm.$route.params.id).toEqual(Event.id);
    });

    it("Should get event from API", () => {
        // Assert
        expect(wrapper.vm.$route.params.id).toEqual(Event.id);
    });
});
