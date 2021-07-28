import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import axios from "axios";

import App from "@components/App.vue";
import { UtilsModule } from "@/store/modules/Utils";
import { AlertModel } from "@/models/Alert";
import { SnackbarModel } from "@/models/Snackbar";
import { AuthModule } from "@/store/modules/Auth";
import { user } from "@/tests/constans/User";

const EMAIL_NOT_VERIFIED = "Email not verified!";
const INBOX_CHECK = "Check your inbox at ";
const RESEND_LINK_MSG = "Verification Link resend successfully!";

jest.mock("axios");

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
            router,
            stubs: {
                Navbar: true,
                NavbarDrawer: true
            }
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
        jest.clearAllMocks();
    });

    it("Should match the snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get authenticated user", async () => {
        // Assert
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));

        // Act
        const authUser = await AuthModule.getAuthUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.user).toEqual(authUser);
    });

    it("Should not get authenticated user", async () => {
        // Assert
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject());

        // Act
        await AuthModule.getAuthUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.user).toBeNull();
    });

    it("Should render alert and its content", () => {
        // Arrange
        wrapper = mount(App, {
            localVue,
            vuetify,
            router,
            computed: {
                user: () => true
            },
            stubs: {
                Navbar: true,
                NavbarDrawer: true
            }
        });

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
        // Arrange
        wrapper = mount(App, {
            localVue,
            vuetify,
            router,
            computed: {
                user: () => true
            },
            stubs: {
                Navbar: true,
                NavbarDrawer: true
            }
        });
        const snackbar = wrapper.find(".v-snack");

        // Assert
        expect(snackbar.text()).toContain(RESEND_LINK_MSG);
    });
});
