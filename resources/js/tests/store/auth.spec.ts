import { AuthModule } from "@modules/Auth";
import { user } from "@/tests/constans/User";
import axios from "axios";
import { UtilsModule } from "@/store/modules/Utils";
import { SnackbarModel } from "@/models/Snackbar";
import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";
import router from "@/routes/router";

jest.mock("axios");

describe("Auth module", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should get user", async () => {
        // Arrange
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));

        // Act
        const authUser = await AuthModule.getAuthUser();

        // Assert
        const result = AuthModule.authUser;
        expect(result).toBe(authUser);
    });

    it("Should get authenticated user", async () => {
        // Act
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));

        // Assert
        await expect(AuthModule.getAuthUser()).resolves.toEqual(user);
        expect(AuthModule.authUser).toEqual(user);
    });

    it("Should fail retrieving auth user", async () => {
        // Act
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject(null));

        // Assert
        await expect(AuthModule.getAuthUser()).resolves.toBe(null);
        expect(AuthModule.authUser).toBe(null);
        expect(UtilsModule.snackbar).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(
                    "You are not authenticated! Reload the page and try to login again."
                )
                .setColor(EnumSnackbarColor.ERROR)
                .setIcon(EnumSnackbarIcon.ERROR)
        );
    });

    it("Should logout user", async () => {
        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve());
        await AuthModule.logout();

        // Assert
        expect(AuthModule.authUser).toBeNull();
        // expect(router.currentRoute.name).toBe("Login");
    });

    it("Should fail logging out user", async () => {
        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.reject());
        await AuthModule.logout();

        // Assert
        expect(UtilsModule.snackbar).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage("Cannot log you out, please reload the page.")
                .setColor(EnumSnackbarColor.ERROR)
                .setIcon(EnumSnackbarIcon.ERROR)
        );
    });
});
