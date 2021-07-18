import Vuetify from "vuetify";
import VueRouter from "vue-router";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import axios from "axios";

import App from "@components/App.vue";
import { AuthModule } from "@modules/Auth";
import { UtilsModule } from "@modules/Utils";
import { SnackbarModel } from "@/models/Snackbar";

jest.mock("axios");

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

        wrapper = shallowMount(App, {
            localVue,
            vuetify,
            router
        });

        AuthModule.SET_USER(user);
        UtilsModule.setAlert(true);
    });

    afterEach(() => {
        wrapper.destroy();
        jest.resetAllMocks();
    });

    it("Should match the snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get authenticated user object", () => {
        // Arrange
        const user = AuthModule.user;

        // Assert
        // @ts-ignore
        expect(wrapper.vm.authUser).toEqual(user);
    });

    it("Should get authenticated user email", () => {
        // Arrange
        const user = AuthModule.user!;
        const userEmail = user.email;

        // Assert
        // @ts-ignore
        expect(wrapper.vm.userEmail).toEqual(userEmail);
    });

    it("Should not get authenticated user email", () => {
        // Arrange
        AuthModule.SET_USER(null);
        // Assert
        // @ts-ignore
        expect(wrapper.vm.userEmail).toBeNull();
    });

    it("Should get authenticated user ID", () => {
        // Arrange
        const user = AuthModule.user!;
        const userID = user.id;

        // Assert
        // @ts-ignore
        expect(wrapper.vm.userId).toEqual(userID);
    });

    it("Should not get authenticated user ID", () => {
        // Arrange
        AuthModule.SET_USER(null);

        // Assert
        // @ts-ignore
        expect(wrapper.vm.userId).toBeNull();
    });

    it("Should get info whether to show alert", () => {
        // Arrange
        const showAlert = UtilsModule.showAlert;

        // Assert
        // @ts-ignore
        expect(wrapper.vm.alert).toEqual(showAlert);
    });

    it("Should trigger resendVerificationLink method", async () => {
        // Arrange
        const spy = jest.spyOn(
            wrapper.vm,
            // @ts-ignore
            "resendVerificationLink"
        );

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve(true));
        // @ts-ignore
        await wrapper.vm.resendVerificationLink();

        // Assert
        expect(UtilsModule.snackbarNotification).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(RESEND_LINK_MSG)
        );
        expect(spy).toHaveBeenCalled();
    });

    it("Should trigger resendVerificationLink method with rejected value", async () => {
        // Arrange
        const spy = jest.spyOn(axios, "post").mockRejectedValueOnce(false);

        // Assert
        try {
            // @ts-ignore
            await wrapper.vm.resendVerificationLink();
        } catch {
            expect(spy).toHaveBeenCalled();
            expect(spy).resolves.toBe(false);
        }
    });

    it("Should render that email has not been verified", () => {
        // Act
        const topBar = wrapper.find("v-system-bar-stub");

        // Assert
        expect(topBar.text()).toContain(EMAIL_NOT_VERIFIED);
    });

    it("Should render authenticated user email", () => {
        // Act
        const topBar = wrapper.find("v-system-bar-stub");

        // Assert
        expect(topBar.text()).toContain(INBOX_CHECK + user.email);
    });
});
