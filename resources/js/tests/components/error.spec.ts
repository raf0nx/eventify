import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import ErrorPage from "@components/error/ErrorPage.vue";

const ERROR_PAGE_HEADER = "Page not found!";

describe("Auth.vue", () => {
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

    it("Should contain error page header", () => {
        const header = wrapper.find(".display-1");
        expect(header.text()).toEqual(ERROR_PAGE_HEADER);
    });
});
