import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import DashboardSidebar from "@components/dashboard/DashboardSidebar.vue";

describe("DashboardSidebar.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<DashboardSidebar>;

    beforeEach(() => {
        wrapper = shallowMount(DashboardSidebar, { localVue });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });
});
