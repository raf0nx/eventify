export default {
    async getAuthUser() {
        return await axios.get("api/user");
    },
    async loginUser(payload) {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/login", payload);
    },
    async logout() {
        await axios.post("/logout");
    },
    async registerUser(payload) {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/register", payload);
    }
};
