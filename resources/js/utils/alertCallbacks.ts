import { SnackbarModel } from "@/models/Snackbar";
import AuthService from "@/services/AuthService";
import { AuthModule } from "@/store/modules/Auth";
import { UtilsModule } from "@/store/modules/Utils";

export default new class AlertCallbacks {
    async resendVerificationLink(): Promise<void> {
        UtilsModule.setLoading(true);
        try {
            await AuthService.sendVerification(AuthModule.authUser?.id ?? null);
            UtilsModule.setSnackbar(
                new SnackbarModel()
                    .setShowSnackbar(true)
                    .setMessage("Verification Link resend successfully!")
            );
        } catch (error) {
            console.log(error);
        }
        UtilsModule.setLoading(false);
    }
}
