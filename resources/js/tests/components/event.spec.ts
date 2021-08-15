import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import moment from "moment";

import Event from "@/components/dashboard/event/Event.vue";
import { Event as EventMock } from "@/tests/constans/Event";

describe("Event.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Event>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Event, {
            localVue,
            vuetify,
            propsData: {
                event: EventMock
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get formatted event start date", () => {
        // Arrange
        const expectedDate = moment(EventMock.start_datetime).format(
            "dddd, MMM Do YYYY"
        );

        // Act
        // @ts-ignore
        const startDateFormatted = wrapper.vm.eventStartDate;

        // Assert
        expect(startDateFormatted).toEqual(expectedDate);
    });

    it("Should get formatted event start time", () => {
        // Arrange
        const expectedTime = moment(EventMock.start_datetime).format("h a");

        // Act
        // @ts-ignore
        const startTimeFormatted = wrapper.vm.eventStartTime;

        // Assert
        expect(startTimeFormatted).toEqual(expectedTime);
    });
});
