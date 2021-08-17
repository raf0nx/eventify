import axios, { AxiosResponse } from "axios";

import { Event as EventModel } from "@/models/Event";

class EventService {
    getEvents(): Promise<AxiosResponse<EventModel[]>> {
        return axios.get("/api/events");
    }

    createEvent(eventData: EventModel): Promise<AxiosResponse<void>> {
        return axios.post("/api/events", eventData);
    }

    updateEvent(
        eventData: EventModel,
        eventId: number
    ): Promise<AxiosResponse<void>> {
        return axios.patch(`/api/events/${eventId}`, eventData);
    }
}

export default new EventService();
