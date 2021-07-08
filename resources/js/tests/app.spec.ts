import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex, { Store } from "vuex";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import App from "@components/App.vue";

const EMAIL_NOT_VERIFIED = "Email not verified!";

describe("App.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);

    const router = new VueRouter();
    let vuetify: Vuetify;
    let wrapper: Wrapper<App>;
    let state: any;
    let getters;
    let store: any;

    beforeEach(() => {
        vuetify = new Vuetify();

        state = {
            showAlert: true,
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

        wrapper = shallowMount(App, { localVue, vuetify, router, store });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match the snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get authenticated user object", () => {
        const user = store.getters.authUser;
        expect(user).toEqual(store.state.user);
    });

    it("Should trigger the resend email method", async () => {
        const resendButton = wrapper.find("v-btn-stub");
        await resendButton.trigger("click");
        expect(wrapper.emitted("resendVerificationLink")).toBeFalsy();
    });

    it("Should render that email has not been verified", () => {
        expect(wrapper.html()).toContain(EMAIL_NOT_VERIFIED);
    });
});
