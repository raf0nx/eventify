import { User } from "./User";

export interface Event {
    created_at?: Date;
    description: string;
    image?: File[];
    id?: number;
    name: string;
    start_datetime: string;
    updated_at?: Date;
    users?: User[];
}
