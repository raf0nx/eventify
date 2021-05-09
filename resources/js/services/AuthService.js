import axios from "axios";

export default {
    getAuthUser() {
        return axios.get("/api/user");
    },
    async loginUser(payload) {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/login", payload);
    },
    logout() {
        return axios.post("/logout");
    },
    async registerUser(payload) {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/register", payload);
    },
    sendVerification(payload) {
        return axios.post("/email/verification-notification", payload);
    }
};
