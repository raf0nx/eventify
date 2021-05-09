export const namespaced = true;

export const state = {
    snackbarNotify: {},
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
    SET_SNACKBAR(state, snackbarInfo) {
        state.snackbarNotify = snackbarInfo;
    }
};
export const actions = {
    setSnackbar({ commit }, payload) {
        commit("SET_SNACKBAR", payload);
        setTimeout(
            () =>
                commit("SET_SNACKBAR", { showSnackbar: false, message: null }),
            4000
        );
    }
};

export const getters = {
    showAlert: state => {
        return state.showAlert;
    },
    isLoading: state => {
        return state.loading;
    },
    snackbarNotify: state => {
        return state.snackbarNotify;
    }
};
