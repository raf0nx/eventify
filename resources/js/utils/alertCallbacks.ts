import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";
import { SnackbarModel } from "@/models/Snackbar";
import AuthService from "@/services/AuthService";
import { AuthModule } from "@/store/modules/Auth";
import { UtilsModule } from "@/store/modules/Utils";

export default new class AlertCallbacks {
    async resendVerificationLink(): Promise<void> {
        UtilsModule.setLoader(true);
        try {
            await AuthService.sendVerification(AuthModule.authUser!.id);
            UtilsModule.setSnackbar(
                new SnackbarModel()
                    .setShowSnackbar(true)
                    .setMessage("Verification Link resend successfully!")
            );
        } catch {
            UtilsModule.setSnackbar(
                new SnackbarModel()
                    .setShowSnackbar(true)
                    .setMessage(
                        "Operation failed, please try again or reload the page."
                    )
                    .setColor(EnumSnackbarColor.ERROR)
                    .setIcon(EnumSnackbarIcon.ERROR)
            );
        }
        UtilsModule.setLoader(false);
    }
};
