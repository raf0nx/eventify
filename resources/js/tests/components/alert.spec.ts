import Vuetify from "vuetify";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import Alert from "@components/utils/Alert.vue";
import { UtilsModule } from "@modules/Utils";
import { AlertModel } from "@/models/Alert";

const MESSAGE = "Message for test purposes";
const BTN_TEXT = "See more";

describe("Snackbar.vue", () => {
    const localVue = createLocalVue();

    let vuetify: Vuetify;
    let wrapper: Wrapper<Alert>;

    beforeEach(() => {
        vuetify = new Vuetify();

        wrapper = shallowMount(Alert, {
            localVue,
            vuetify
        });

        UtilsModule.setAlert(
            new AlertModel()
                .setShowAlert(true)
                .setMessage(MESSAGE)
                .setCallback(() => true)
                .setBtnText(BTN_TEXT)
        );
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get alert object from store", () => {
        // Arrange
        const alertModel = UtilsModule.alert;

        // Assert
        // @ts-ignore
        expect(wrapper.vm.alert).toEqual(alertModel);
    });
});
