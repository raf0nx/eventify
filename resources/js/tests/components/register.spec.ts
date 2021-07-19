import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import Register from "@components/auth/Register.vue";

jest.mock("axios");

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
        jest.clearAllMocks();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should trigger register method", async () => {
        // Arrange
        const spy = jest
            //@ts-ignore
            .spyOn(wrapper.vm, "registerUser");

        // Act
        // @ts-ignore
        axios.post.mockResolvedValue();

        // Assert
        try {
            // @ts-ignore
            await wrapper.vm.registerUser();
        } catch {
            expect(spy).toHaveBeenCalled();
        }
    });
});
