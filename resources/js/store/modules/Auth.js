import router from "../../router/router";
import AuthService from "../../services/AuthService";

export const namespaced = true;

export const state = {
    user: null,
    showAlert: false,
    loading: false
};

export const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_ALERT(state, setAlert) {
        state.showAlert = setAlert;
    },
    SET_LOADING(state, isLoading) {
        state.loading = isLoading;
    }
};

export const actions = {
    async getAuthUser({ commit }) {
        try {
            const authUser = await AuthService.getAuthUser();
            commit("SET_USER", authUser.data);
            return authUser.data;
        } catch (error) {
            commit("SET_USER", null);
        }
    },
    logout({ commit }) {
        try {
            AuthService.logout();
            commit("SET_USER", null);
            if (router.currentRoute.name !== "Login") {
                router.push({ name: "Login" });
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const getters = {
    authUser: state => {
        return state.user;
    },
    showAlert: state => {
        return state.showAlert;
    },
    isLoading: state => {
        return state.loading;
    }
};
