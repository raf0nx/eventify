import { LoginFormData, RegisterFormData } from "@/components/auth/types";
import { User } from "@/models/User";
import axios, { AxiosResponse } from "axios";

class AuthService {
    public getAuthUser(): Promise<AxiosResponse<User>> {
        return axios.get("/api/user");
    }

    public async loginUser(
        formData: LoginFormData
    ): Promise<AxiosResponse<void>> {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/login", formData);
    }

    public logout(): Promise<AxiosResponse<void>> {
        return axios.post("/logout");
    }

    public async registerUser(
        formData: RegisterFormData
    ): Promise<AxiosResponse<void>> {
        await axios.get("/sanctum/csrf-cookie");
        return axios.post("/register", formData);
    }

    public sendVerification(
        userID: Number | null
    ): Promise<AxiosResponse<void>> {
        return axios.post("/email/verification-notification", userID);
    }
}

export default new AuthService();
