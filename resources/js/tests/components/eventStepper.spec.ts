import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import moment from "moment";
import axios from "axios";

import EventStepper from "@components/dashboard/event/EventStepper.vue";
import { Event } from "@/tests/constans/Event";
import { UtilsModule } from "@/store/modules/Utils";
import { SnackbarModel } from "@/models/Snackbar";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";
import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";

jest.mock("axios");

describe("EventStepper.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<EventStepper>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(EventStepper, { localVue, vuetify });
    });

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get minimum event date", () => {
        // Assert
        // @ts-ignore
        expect(wrapper.vm.minEventDate).toEqual(moment().format("YYYY-MM-DD"));
    });

    it("Should get minimum event time current day", () => {
        // Assert
        // @ts-ignore
        expect(wrapper.vm.minEventTime).toEqual(moment().format("HH:mm"));
    });

    it("Should get minimum event time", () => {
        // Act
        // @ts-ignore
        wrapper.vm.eventDate = "1970-01-01 00:00:00";

        // Assert
        // @ts-ignore
        expect(wrapper.vm.minEventTime).toEqual("00:00");
    });

    it("Should create an event and dispatch notification", async () => {
        // Arrange
        // @ts-ignore
        wrapper.vm.event.name = Event.name;
        // @ts-ignore
        wrapper.vm.event.description = Event.description;
        // @ts-ignore
        wrapper.vm.event.image = Event.image;
        // @ts-ignore
        wrapper.vm.event.start_datetime = Event.start_datetime;

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve());
        // @ts-ignore
        await wrapper.vm.createEvent();

        // Assert
        expect(UtilsModule.snackbar).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage("Event created successfully!")
                .setIcon(EnumSnackbarIcon.SUCCESS)
                .setColor(EnumSnackbarColor.SUCCESS)
        );
    });

    it("Should fail creating an event and inform user about it", async () => {
        // Arrange
        // @ts-ignore
        wrapper.vm.event.name = Event.name;
        // @ts-ignore
        wrapper.vm.event.description = Event.description;
        // @ts-ignore
        wrapper.vm.event.image = Event.image;
        // @ts-ignore
        wrapper.vm.event.start_datetime = Event.start_datetime;

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.reject());
        // @ts-ignore
        await wrapper.vm.createEvent();

        // Assert
        expect(UtilsModule.snackbar).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(
                    "Couldn't create your event. Reload the page and try again."
                )
                .setIcon(EnumSnackbarIcon.ERROR)
                .setColor(EnumSnackbarColor.ERROR)
        );
    });
});
