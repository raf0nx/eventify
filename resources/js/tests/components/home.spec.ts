import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";

import Home from "@components/main/Home.vue";
import { AuthModule } from "@/store/modules/Auth";

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
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should logout user", async () => {
        // Act
        // @ts-ignore
        await wrapper.vm.logout();

        // Assert
        expect(AuthModule.authUser).toBeNull();
    });
});
