import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import App from "@components/App.vue";

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
    });

    it("Should match the snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get authenticated user object", () => {
        // @ts-ignore
        const user = wrapper.vm.authUser;
        expect(user).toEqual(store.state.user);
    });

    it("Should contain resend link button", async () => {
        const resendButton = wrapper.find("v-btn-stub");
        await resendButton.trigger("click");
        expect(resendButton.text()).toEqual(RESEND_LINK);
    });

    it("Should trigger resendVerificationLink method", async () => {
        const resendLinkSent = jest
            .spyOn(
                wrapper.vm,
                // @ts-ignore
                "resendVerificationLink"
            )
            .mockResolvedValue(true);
        // @ts-ignore
        const isSend = await wrapper.vm.resendVerificationLink();

        expect(resendLinkSent).toBeCalled();
        expect(isSend).toBe(true);
    });

    it("Should render snackbar after resend link", async () => {
        expect(store.state.snackbarNotification.showSnackbar).toEqual(false);
        expect(store.state.snackbarNotification.message).toEqual(null);

        const resendLinkSent = jest
            .spyOn(
                wrapper.vm,
                // @ts-ignore
                "resendVerificationLink"
            )
            .mockResolvedValue(true);
        // @ts-ignore
        const isSend = await wrapper.vm.resendVerificationLink();

        expect(resendLinkSent).toBeCalled();
        expect(isSend).toBe(true);

        store.state.snackbarNotification.showSnackbar = true;
        store.state.snackbarNotification.message = RESEND_LINK_MSG;

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain(RESEND_LINK_MSG);
    });

    it("Should render that email has not been verified", () => {
        const topBar = wrapper.find("v-system-bar-stub");
        expect(topBar.text()).toContain(EMAIL_NOT_VERIFIED);
    });

    it("Should render authenticated user email", () => {
        const topBar = wrapper.find("v-system-bar-stub");
        expect(topBar.text()).toContain(INBOX_CHECK + store.state.user.email);
    });
});
