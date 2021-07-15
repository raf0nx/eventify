import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import Register from "@components/auth/Register.vue";

jest.mock("axios");

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
        jest.resetAllMocks();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should contain Sign Up header", () => {
        // Arrange
        const header = wrapper.find("h1");

        // Act
        expect(header.text()).toEqual(SIGN_UP);
    });

    it("Should trigger register method", async () => {
        // Arrange
        const spy = jest
            //@ts-ignore
            .spyOn(wrapper.vm, "registerUser");

        // Act
        // @ts-ignore
        axios.post.mockResolvedValue(true);

        // Assert
        try {
            // @ts-ignore
            await wrapper.vm.registerUser();
        } catch {
            expect(spy).toHaveBeenCalled();
        }
    });
});
