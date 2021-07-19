import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import Home from "@components/main/Home.vue";
import { AuthModule } from "@/store/modules/Auth";

jest.mock("axios");

describe("Home.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Home>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Home, { localVue, vuetify });
    });

    afterEach(() => {
        wrapper.destroy();
        jest.clearAllMocks();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should logout user", async () => {
        // Act
        // @ts-ignore
        axios.post.mockResolvedValue();
        // @ts-ignore
        await wrapper.vm.logout();

        // Assert
        expect(AuthModule.authUser).toBeNull();
    });
});
