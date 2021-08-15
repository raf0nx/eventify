import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import NavbarDrawer from "@/components/utils/NavbarDrawer.vue";
import { AuthModule } from "@/store/modules/Auth";
import { UtilsModule } from "@/store/modules/Utils";
import { user } from "@/tests/constans/User";

jest.mock("axios");

describe("NavbarDrawer.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<NavbarDrawer>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(NavbarDrawer, { localVue, vuetify });
    });

    afterEach(() => {
        wrapper.destroy();
        jest.clearAllMocks();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get user", async () => {
        // Arrange
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));

        // Act
        const authUser = await AuthModule.getAuthUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.user).toEqual(authUser);
    });

    it("Should not get user", async () => {
        // Arrange
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject());

        // Act
        await AuthModule.getAuthUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.user).toBeNull();
    });

    it("Should set navbar drawer", () => {
        // Act
        // @ts-ignore
        wrapper.vm.navDrawer = true;

        // Assert
        expect(UtilsModule.isNavDrawer).toBe(true);
    });

    it("Should logout user", async () => {
        // Arrange
        // @ts-ignore
        axios.post.mockResolvedValue();

        // Act
        // @ts-ignore
        await wrapper.vm.logout();

        // Assert
        expect(AuthModule.authUser).toBeNull();
    });
});
