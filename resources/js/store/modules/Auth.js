import router from "../../router/router";
import AuthService from "../../services/AuthService";

export const namespaced = true;

export const state = {
    user: null,
};

export const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
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
};
