export const namespaced = true;

export const state = {
    showSnackbar: false,
    showAlert: false,
    loading: false
};
export const mutations = {
    SET_ALERT(state, setAlert) {
        state.showAlert = setAlert;
    },
    SET_LOADING(state, isLoading) {
        state.loading = isLoading;
    },
    SET_SNACKBAR(state, setSnackbar) {
        state.showSnackbar = setSnackbar;
    }
};
export const actions = {
    setSnackbar({ commit }) {
        commit("SET_SNACKBAR", true);
        setTimeout(() => commit("SET_SNACKBAR", false), 2500);
    }
};

export const getters = {
    showAlert: state => {
        return state.showAlert;
    },
    isLoading: state => {
        return state.loading;
    },
    showSnackbar: state => {
        return state.showSnackbar;
    }
};
