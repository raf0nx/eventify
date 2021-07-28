import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import Navbar from "@/components/utils/Navbar.vue";
import { AuthModule } from "@/store/modules/Auth";
import { UtilsModule } from "@/store/modules/Utils";
import { user } from "@/tests/constans/User";

jest.mock("axios");

describe("Navbar.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Navbar>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Navbar, { localVue, vuetify });
    });

    afterEach(() => {
        wrapper.destroy();
        jest.clearAllMocks();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should get username", async () => {
        // Arrange
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));

        // Act
        const authUser = await AuthModule.getAuthUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.username).toEqual(authUser!.name);
    });

    it("Should not get username", async () => {
        // Arrange
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject());

        // Act
        await AuthModule.getAuthUser();

        // Assert
        // @ts-ignore
        expect(wrapper.vm.username).toBeFalsy();
    });

    it("Should set navbar drawer", () => {
        // Act
        // @ts-ignore
        wrapper.vm.setNavDrawer(true);

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
