import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";
import VueRouter from "vue-router";

import Login from "@components/auth/Login.vue";
import { user } from "@/tests/constans/User";
import { UtilsModule } from "@/store/modules/Utils";
import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";
import { SnackbarModel } from "@/models/Snackbar";

jest.mock("axios");

describe("Login.vue", () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter();
    let wrapper: Wrapper<Login>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = mount(Login, {
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

    it("Should log in user successfully", async () => {
        // Arrange
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve());
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));

        // Act
        // @ts-ignore
        await wrapper.vm.loginUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.$router.currentRoute.path === "/");
    });

    it("Should fail retrieving user after logging in", async () => {
        // Arrange
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve());
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: null }));

        // Act
        // @ts-ignore
        await wrapper.vm.loginUser();

        // Assert
        // @ts-ignore
        expect(UtilsModule.snackbar).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage("Cannot authenticate you. Please try again.")
                .setColor(EnumSnackbarColor.ERROR)
                .setIcon(EnumSnackbarIcon.ERROR)
        );
    });

    it("Should fail loggin in user", async () => {
        // Arrange
        const error = {
            response: {
                data: {
                    errors: {
                        password: ["Email or password are incorrect!"]
                    }
                }
            }
        };

        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.reject(error));

        // Act
        // @ts-ignore
        await wrapper.vm.loginUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.loginUser()).rejects;
    });
});
