import axios from "axios";

import EventService from "@/services/EventService";
import { Event } from "@/tests/constans/Event";

jest.mock("axios");

describe("Event Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should get events from API", async () => {
        // Act
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve(Event));

        // Assert
        await expect(EventService.getEvents()).resolves.toEqual(Event);
    });

    it("Should create an event", async () => {
        // Arrange
        const eventData = {
            name: Event.name,
            description: Event.description,
            image: Event.image,
            start_datetime: Event.start_datetime
        };

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() =>
            Promise.resolve({ ...eventData, status: 201 })
        );

        // Assert
        await expect(EventService.createEvent(eventData)).resolves.toEqual({
            ...eventData,
            status: 201
        });
    });
});
