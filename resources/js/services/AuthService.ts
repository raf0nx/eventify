import { LoginFormData, RegisterFormData } from "@/components/auth/types";
import { User } from "@/models/User";
import axios, { AxiosResponse } from "axios";

class AuthService {
    getAuthUser(): Promise<AxiosResponse<User>> {
        return axios.get("/api/user");
    }

    async loginUser(formData: LoginFormData): Promise<AxiosResponse<void>> {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/login", formData);
    }

    logout(): Promise<AxiosResponse<void>> {
        return axios.post("/logout");
    }

    async registerUser(formData: RegisterFormData): Promise<AxiosResponse<void>> {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/register", formData);
    }

    sendVerification(userID: Number | null): Promise<AxiosResponse<void>> {
        return axios.post("/email/verification-notification", userID);
    }
}

export default new AuthService();
