import axios, { AxiosResponse } from "axios";

import { Event } from "@/models/Event";

class EventService {
    getEvents(): Promise<AxiosResponse<Event[]>> {
        return axios.get("/api/events");
    }

    createEvent(event: Event): Promise<AxiosResponse<void>> {
        return axios.post("/api/events", event);
    }
}

export default new EventService();
