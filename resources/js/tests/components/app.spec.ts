import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { createLocalVue, mount, Wrapper } from "@vue/test-utils";

import App from "@components/App.vue";
import { UtilsModule } from "@/store/modules/Utils";
import { AlertModel } from "@/models/Alert";
import { SnackbarModel } from "@/models/Snackbar";

const EMAIL_NOT_VERIFIED = "Email not verified!";
const INBOX_CHECK = "Check your inbox at ";
const RESEND_LINK_MSG = "Verification Link resend successfully!";

const user = {
    id: 1,
    name: "Test",
    email: "test@gmail.com",
    created_at: new Date("2021-01-01"),
    email_verified_at: undefined,
    updated_at: new Date("2021-01-01")
};

describe("App.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);

    const router = new VueRouter();
    let vuetify: Vuetify;
    let wrapper: Wrapper<App>;

    beforeEach(() => {
        vuetify = new Vuetify();

        wrapper = mount(App, {
            localVue,
            vuetify,
            router
        });

        UtilsModule.setAlert(
            new AlertModel()
                .setShowAlert(true)
                .setMessage(EMAIL_NOT_VERIFIED + INBOX_CHECK + user.email)
                .setCallback(() => true)
                .setBtnText("Send")
        );
        
        UtilsModule.setSnackbar(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(RESEND_LINK_MSG)
        );
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match the snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should render alert and its content", () => {
        // Act
        const alert = wrapper.find(".v-alert");
        const button = wrapper.find("button");

        // Assert
        expect(alert.text()).toContain(
            EMAIL_NOT_VERIFIED + INBOX_CHECK + user.email
        );
        expect(button.text()).toBe("Send");
    });

    it("Should render snackbar and it's message", () => {
        // Assert
        expect(wrapper.html()).toContain(RESEND_LINK_MSG);
    });
});
