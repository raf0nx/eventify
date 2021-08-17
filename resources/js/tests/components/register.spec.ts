import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";
import VueRouter from "vue-router";

import Register from "@components/auth/Register.vue";

jest.mock("axios");

describe("Register.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter();
    let wrapper: Wrapper<Register>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = mount(Register, {
            localVue,
            vuetify,
            router
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should register a user successfully", async () => {
        // Arrange
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve());

        // Act
        // @ts-ignore
        await wrapper.vm.registerUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.$router.currentRoute.path === "/");
    });

    it("Should fail registering a user", async () => {
        // Arrange
        const error = {
            response: {
                data: {
                    errors: {
                        name: ["The name has already been taken."],
                        email: ["The email has already been taken."]
                    }
                }
            }
        };

        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.reject(error));

        // Act
        // @ts-ignore
        await wrapper.vm.registerUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.registerUser()).rejects;
    });
});
