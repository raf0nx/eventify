import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import moment from "moment";
import axios from "axios";

import EventStepper from "@components/dashboard/event/EventStepper.vue";
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
        wrapper = mount(EventStepper, { localVue, vuetify });
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
        axios.post.mockImplementationOnce(() => Promise.resolve());

        // Act
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
        const error = {
            response: {
                data: {
                    errors: {
                        name: ["The name has already been taken."],
                        description: [
                            "The description must be at least 10 characters."
                        ]
                    }
                }
            }
        };

        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.reject(error));

        // Act
        // @ts-ignore
        await wrapper.vm.createEvent();

        // Assert
        expect(UtilsModule.snackbar).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(
                    "Couldn't create your event. Perhaps you have some errors in the form. If no, reload the page and try again."
                )
                .setIcon(EnumSnackbarIcon.ERROR)
                .setColor(EnumSnackbarColor.ERROR)
        );
    });

    it("Should change current step to 1 after bad name validation", () => {
        // Arrange
        const error = {
            name: ["The name has already been taken."]
        };

        // Act
        // @ts-ignore
        wrapper.vm.setStepAfterValidation(error);

        // Assert
        // @ts-ignore
        expect(wrapper.vm.currentStep).toBe(1);
    });

    it("Should change current step to 2 after bad description validation", () => {
        // Arrange
        const error = {
            description: ["The description must be at least 10 characters."]
        };

        // Act
        // @ts-ignore
        wrapper.vm.setStepAfterValidation(error);

        // Assert
        // @ts-ignore
        expect(wrapper.vm.currentStep).toBe(2);
    });
});
