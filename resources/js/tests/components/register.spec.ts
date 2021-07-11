import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";

import Register from "@components/auth/Register.vue";

const SIGN_UP = "Create a new account";

describe("Register.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Register>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();

        wrapper = shallowMount(Register, {
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

    it("Should contain Sign Up header", () => {
        const header = wrapper.find("h1");
        expect(header.text()).toEqual(SIGN_UP);
    });

    it("Should trigger register method", async () => {
        const registerSpy = jest
            // @ts-ignore
            .spyOn(wrapper.vm, "registerUser")
            .mockResolvedValue(true);
        // @ts-ignore
        const isRegistered = await wrapper.vm.registerUser();

        expect(registerSpy).toBeCalled();
        expect(isRegistered).toBe(true);
    });
});
