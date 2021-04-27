export const namespaced = true;

export const state = {
    message: null,
    showAlert: false
};

export const mutations = {
    SET_ALERT(state, message) {
        state.showAlert = true;
        state.message = message;
    }
};

export const actions = {};

export const getters = {
    message: state => {
        return state.message;
    },
    showAlert: state => {
        return state.showAlert;
    }
};
