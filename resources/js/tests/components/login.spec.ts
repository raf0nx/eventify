import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";

import Login from "@components/auth/Login.vue";

const SIGN_IN = "Sign In";

describe("Login.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Login>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();

        wrapper = shallowMount(Login, {
            localVue,
            vuetify
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should contain Sign In header", () => {
        const header = wrapper.find("h1");
        expect(header.text()).toEqual(SIGN_IN);
    });

    it("Should trigger login method", async () => {
        const loginSpy = jest
            // @ts-ignore
            .spyOn(wrapper.vm, "loginUser")
            .mockResolvedValue(true);
        // @ts-ignore
        const isLoggedIn = await wrapper.vm.loginUser();

        expect(loginSpy).toBeCalled();
        expect(isLoggedIn).toBe(true);
    });
});
