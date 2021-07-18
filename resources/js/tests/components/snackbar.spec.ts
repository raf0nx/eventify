import Vuetify from "vuetify";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import Snackbar from "@components/utils/Snackbar.vue";
import { UtilsModule } from "@modules/Utils";
import { SnackbarModel } from "@/models/Snackbar";

describe("Snackbar Component", () => {
    const localVue = createLocalVue();

    let vuetify: Vuetify;
    let wrapper: Wrapper<Snackbar>;

    beforeEach(() => {
        vuetify = new Vuetify();

        wrapper = shallowMount(Snackbar, {
            localVue,
            vuetify
        });

        UtilsModule.setSnackbar(new SnackbarModel());
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should get snackbar object from store", () => {
        // Arrange
        const snackbarObj = UtilsModule.snackbar;

        // Assert
        // @ts-ignore
        expect(wrapper.vm.snackbar).toEqual(snackbarObj);
    });
});
