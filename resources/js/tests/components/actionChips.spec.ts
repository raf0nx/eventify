import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";

import ActionChips from "@/components/dashboard/event/ActionChips.vue";

describe("ActionChips.vue", () => {
    const localVue = createLocalVue();
    let wrapper: Wrapper<ActionChips>;

    beforeEach(() => {
        wrapper = shallowMount(ActionChips, { localVue });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("Should match snapshot", () => {
        // Assert
        expect(wrapper.html()).toMatchSnapshot();
    });
});
