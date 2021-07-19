import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import ErrorPage from "@components/error/ErrorPage.vue";

describe("ErrorPage.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<ErrorPage>;

    beforeEach(() => {
        wrapper = shallowMount(ErrorPage, { localVue });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });
});
