import { User } from "./User";

export interface Event {
    created_at: Date;
    description: string;
    event_image: string;
    id: number;
    name: string;
    start_datetime: Date;
    updated_at: Date;
    users: User[];
}
