import axios from "axios";
import { SnackbarModel } from "@/models/Snackbar";
import { UtilsModule } from "@/store/modules/Utils";
import AlertCallbacks from "@/utils/alertCallbacks";
import { AuthModule } from "@/store/modules/Auth";
import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";
import { user } from "@/tests/constans/User";

const RESEND_LINK_MSG = "Verification Link resend successfully!";

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
        expect(UtilsModule.snackbar).toEqual(
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
        expect(UtilsModule.snackbar).toEqual(
            new SnackbarModel()
                .setShowSnackbar(true)
                .setMessage(
                    "Operation failed, please try again or reload the page."
                )
                .setColor(EnumSnackbarColor.ERROR)
                .setIcon(EnumSnackbarIcon.ERROR)
        );
    });
});
