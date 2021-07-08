import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import ErrorPage from "@components/error/ErrorPage.vue";

const ERROR_PAGE_HEADER = "Page not found!";

describe("Auth.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<ErrorPage>;

    beforeEach(() => {
        wrapper = shallowMount(ErrorPage, { localVue });
    });

    it("Should match snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("Should contain error page header", () => {
        expect(wrapper.html()).toContain(ERROR_PAGE_HEADER);
    })
});
