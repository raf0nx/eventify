import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";

import Dashboard from "@/components/main/Dashboard.vue";
import { AuthModule } from "@/store/modules/Auth";

jest.mock("axios");

describe("Dashboard.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<Dashboard>;
    let vuetify: Vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = shallowMount(Dashboard, { localVue, vuetify });
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
