import axios from "axios";
import AuthService from "@/services/AuthService";

jest.mock("axios");

const user = {
    id: 1,
    name: "Test",
    email: "test@example.com",
    password: "password",
    created_at: new Date("2021-01-01"),
    email_verified_at: new Date("2021-01-01"),
    updated_at: new Date("2021-01-01")
};

describe("Auth Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should get auth user from API", async () => {
        // Act
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve(user));

        // Assert
        await expect(AuthService.getAuthUser()).resolves.toEqual(user);
    });

    it("Should register a user", async () => {
        // Arrange
        const formData = {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password
        };

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() =>
            Promise.resolve({ ...formData, status: 201 })
        );

        // Assert
        await expect(AuthService.registerUser(formData)).resolves.toEqual({
            ...formData,
            status: 201
        });
    });

    it("Should login a user", async () => {
        // Arrange
        const formData = {
            email: user.email,
            password: user.password
        };

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() =>
            Promise.resolve({ ...formData, status: 200 })
        );

        // Assert
        await expect(AuthService.loginUser(formData)).resolves.toEqual({
            ...formData,
            status: 200
        });
    });

    it("Should logout user", async () => {
        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() =>
            Promise.resolve({ status: 204 })
        );

        // Assert
        await expect(AuthService.logout()).resolves.toStrictEqual({
            status: 204
        });
    });

    it("Should send verification link", async () => {
        // Arrange
        const userID = user.id;

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() =>
            Promise.resolve({ status: 202 })
        );

        // Assert
        await expect(
            AuthService.sendVerification(userID)
        ).resolves.toStrictEqual({
            status: 202
        });
    });
});
