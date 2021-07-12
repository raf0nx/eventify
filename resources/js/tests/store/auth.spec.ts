import { AuthModule } from "@modules/Auth";
import { User } from "@/models/User";

describe("Auth store", () => {
    it("Should get user", () => {
        // Arrange
        const state = AuthModule.user;

        // Act
        const result = AuthModule.authUser;

        // Assert
        expect(result).toBe(state);
    });

    it("Should get auth user from API", async () => {
        // Arrange
        const user: User = {
            id: 1,
            name: "Test",
            email: "test@example.com",
            created_at: new Date("2021-01-01"),
            email_verified_at: new Date("2021-01-01"),
            updated_at: new Date("2021-01-01")
        };

        const getAuthUser = jest
            .spyOn(AuthModule, "getAuthUser")
            .mockResolvedValue(user);

        // Act
        const authUser = await AuthModule.getAuthUser();

        // Assert
        expect(getAuthUser).toBeCalled();
        expect(authUser).toBe(user);
    });

    it("Should logout user", async () => {
        // Act
        await AuthModule.logout();

        // Assert
        expect(AuthModule.authUser).toBeNull();
    });
});
