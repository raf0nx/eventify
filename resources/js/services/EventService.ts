import axios, { AxiosResponse } from "axios";

import { Event as EventModel } from "@/models/Event";

class EventService {
    getEvents(): Promise<AxiosResponse<EventModel[]>> {
        return axios.get("/api/events");
    }

    getEvent(eventID: number): Promise<AxiosResponse<EventModel>> {
        return axios.get(`/api/events/${eventID}`);
    }

    createEvent(eventData: EventModel): Promise<AxiosResponse<void>> {
        return axios.post("/api/events", eventData);
    }

    updateEvent(
        eventData: EventModel,
        eventID: number
    ): Promise<AxiosResponse<void>> {
        return axios.patch(`/api/events/${eventID}`, eventData);
    }

    deleteEvent(eventID: number): Promise<AxiosResponse<void>> {
        return axios.delete(`/api/events/${eventID}`);
    }
}

export default new EventService();
