import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import Login from "@components/auth/Login.vue";

jest.mock("axios");

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
        jest.clearAllMocks();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should trigger login method", async () => {
        // Arrange
        const spy = jest
            //@ts-ignore
            .spyOn(wrapper.vm, "loginUser");

        // Act
        // @ts-ignore
        axios.post.mockResolvedValue(true);

        // Assert
        try {
            // @ts-ignore
            await wrapper.vm.loginUser();
        } catch {
            expect(spy).toHaveBeenCalled();
        }
    });
});
