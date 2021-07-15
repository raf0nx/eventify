import { AuthModule } from "@modules/Auth";
import { User } from "@/models/User";
import axios from "axios";

jest.mock("axios");

describe("Auth store", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should get user", () => {
        // Arrange
        const state = AuthModule.user;

        // Act
        const result = AuthModule.authUser;

        // Assert
        expect(result).toBe(state);
    });

    it("Should get auth user from store", async () => {
        // Arrange
        const user: User = {
            id: 1,
            name: "Test",
            email: "test@example.com",
            created_at: new Date("2021-01-01"),
            email_verified_at: new Date("2021-01-01"),
            updated_at: new Date("2021-01-01")
        };

        // Act
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));

        // Assert
        await expect(AuthModule.getAuthUser()).resolves.toEqual(user);
        expect(AuthModule.authUser).toEqual(user);
    });

    it("Should logout user", async () => {
        // Act
        await AuthModule.logout();

        // Assert
        expect(AuthModule.authUser).toBeNull();
    });
});
