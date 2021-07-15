import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import axios from "axios";

import App from "@components/App.vue";

jest.mock("axios");

const EMAIL_NOT_VERIFIED = "Email not verified!";
const INBOX_CHECK = "Check your inbox at ";
const RESEND_LINK = "Resend link";
const RESEND_LINK_MSG = "Verification Link resend successfully!";

describe("App.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);

    const router = new VueRouter();
    let vuetify: Vuetify;
    let wrapper: Wrapper<App>;
    let state: any;
    let getters: any;
    let store: any;

    beforeEach(() => {
        vuetify = new Vuetify();

        state = {
            showAlert: true,
            snackbarNotification: {
                showSnackbar: false,
                message: null
            },
            user: {
                id: 1,
                name: "Test",
                email: "test@gmail.com",
                created_at: "2021-01-01",
                email_verified_at: "2021-01-01",
                updated_at: "2021-01-01"
            }
        };

        getters = {
            authUser: () => state.user
        };

        store = new Vuex.Store({
            state,
            getters
        });

        wrapper = shallowMount(App, {
            localVue,
            vuetify,
            router,
            store,
            computed: {
                alert() {
                    return state.showAlert;
                },
                authUser() {
                    return state.user;
                },
                snackbar() {
                    return state.snackbarNotification;
                }
            }
        });
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
        // @ts-ignore
        const user = wrapper.vm.authUser;

        // Assert
        expect(user).toEqual(store.state.user);
    });

    it("Should get authenticated user ID", () => {
        // Arrange
        // @ts-ignore
        const userID = wrapper.vm.userId;

        // Assert
        expect(userID).toEqual(store.state.user.id);
    });

    it("Should get snackbar object", () => {
        // Arrange
        // @ts-ignore
        const snackbarObj = wrapper.vm.snackbar;

        // Assert
        expect(snackbarObj).toEqual(store.state.snackbarNotification);
    });

    it("Should get info whether to show alert", () => {
        // Arrange
        // @ts-ignore
        const showAlert = wrapper.vm.alert;

        // Assert
        expect(showAlert).toEqual(store.state.showAlert);
    });

    it("Should contain resend link button", async () => {
        // Arrange
        const resendButton = wrapper.find("v-btn-stub");

        // Act
        await resendButton.trigger("click");

        // Assert
        expect(resendButton.text()).toEqual(RESEND_LINK);
    });

    it("Should trigger resendVerificationLink method", async () => {
        // Arrange
        const spy = jest
            .spyOn(
                wrapper.vm,
                // @ts-ignore
                "resendVerificationLink"
            )
            .mockImplementationOnce(() => Promise.resolve(true));

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve(true));

        // Assert
        // @ts-ignore
        await expect(wrapper.vm.resendVerificationLink()).resolves.toBe(true);
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

    it("Should render snackbar after resend link", async () => {
        // Assert
        expect(store.state.snackbarNotification.showSnackbar).toEqual(false);
        expect(store.state.snackbarNotification.message).toEqual(null);

        // Arrange
        const resendLinkSent = jest
            .spyOn(
                wrapper.vm,
                // @ts-ignore
                "resendVerificationLink"
            )
            .mockResolvedValue(true);

        // Act
        // @ts-ignore
        const isSend = await wrapper.vm.resendVerificationLink();

        // Assert
        expect(resendLinkSent).toBeCalled();
        expect(isSend).toBe(true);

        // Act
        store.state.snackbarNotification.showSnackbar = true;
        store.state.snackbarNotification.message = RESEND_LINK_MSG;

        await wrapper.vm.$nextTick();

        // Assert
        expect(wrapper.html()).toContain(RESEND_LINK_MSG);
    });

    it("Should render that email has not been verified", () => {
        // Arrange
        const topBar = wrapper.find("v-system-bar-stub");

        // Assert
        expect(topBar.text()).toContain(EMAIL_NOT_VERIFIED);
    });

    it("Should render authenticated user email", () => {
        // Arrange
        const topBar = wrapper.find("v-system-bar-stub");

        // Assert
        expect(topBar.text()).toContain(INBOX_CHECK + store.state.user.email);
    });
});
