export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}
