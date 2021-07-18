import axios from "axios";

import { SnackbarModel } from "@/models/Snackbar";
import { UtilsModule } from "@/store/modules/Utils";
import AlertCallbacks from "@/utils/alertCallbacks";
import { AuthModule } from "@/store/modules/Auth";
import { User } from "@/models/User";

const RESEND_LINK_MSG = "Verification Link resend successfully!";

const user: User = {
    id: 1,
    name: "Test",
    email: "test@gmail.com",
    created_at: new Date("2021-01-01"),
    email_verified_at: undefined,
    updated_at: new Date("2021-01-01")
};

jest.mock("axios");

describe("Alert callbacks", () => {
    beforeEach(() => {
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: user }));
        AuthModule.getAuthUser();
        UtilsModule.setSnackbar(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(RESEND_LINK_MSG)
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should trigger resendVerificationLink method", async () => {
        // Arrange
        const spy = jest.spyOn(AlertCallbacks, "resendVerificationLink");

        // Act
        // @ts-ignore
        axios.post.mockImplementationOnce(() => Promise.resolve(true));
        await AlertCallbacks.resendVerificationLink();

        // Assert
        expect(UtilsModule.snackbarNotification).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(RESEND_LINK_MSG)
        );
        expect(spy).toHaveBeenCalled();
    });

    it("Should trigger resendVerificationLink method with rejected value", async () => {
        // Arrange
        const spy = jest.spyOn(AlertCallbacks, "resendVerificationLink");
        // @ts-ignore

        // Act
        axios.post.mockRejectedValue(false);
        await AlertCallbacks.resendVerificationLink();

        // Assert
        expect(spy).toHaveBeenCalled();
    });
});
