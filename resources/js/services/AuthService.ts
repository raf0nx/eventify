import axios from "axios";

export function getAuthUser() {
    return axios.get("/api/user");
}

export async function loginUser(payload: any) {
    await axios.get("/sanctum/csrf-cookie");
    return axios.post("/login", payload);
}

export function logout() {
    return axios.post("/logout");
}

export async function registerUser(payload: any) {
    await axios.get("/sanctum/csrf-cookie");
    return axios.post("/register", payload);
}

export function sendVerification(payload: any) {
    return axios.post("/email/verification-notification", payload);
}
