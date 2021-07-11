import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";

import Home from "@components/main/Home.vue";

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
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should trigger logout method", async () => {
        const logoutSpy = jest
            // @ts-ignore
            .spyOn(wrapper.vm, "logout")
            .mockResolvedValue(true);
        // @ts-ignore
        const isLoggedOut = await wrapper.vm.logout();

        expect(logoutSpy).toBeCalled();
        expect(isLoggedOut).toBe(true);
    });
});
