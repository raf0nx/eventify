export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    email_verified_at?: Date;
    updated_at: Date;
}
