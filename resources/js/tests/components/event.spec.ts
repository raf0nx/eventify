import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";

import Event from "@/components/dashboard/event/Event.vue";
import { Event as EventMock } from "@/tests/constans/Event";

describe("Dashboard.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Event>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Event, {
            localVue,
            vuetify,
            propsData: { EventMock }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });
});
