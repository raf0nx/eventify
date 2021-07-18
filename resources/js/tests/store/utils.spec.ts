import { UtilsModule } from "@modules/Utils";
import { SnackbarModel } from "@/models/Snackbar";
import { AlertModel } from "@/models/Alert";

const MESSAGE = "Message for test purposes";

describe("Utils store", () => {
    it("Should set alert and its content", () => {
        // Arrange
        const alertNotification = new AlertModel()
            .setShowAlert(true)
            .setMessage(MESSAGE);

        // Act
        UtilsModule.setAlert(alertNotification);

        // Assert
        expect(UtilsModule.alert).toEqual(alertNotification);
    });

    it("Should set loading true", () => {
        // Arrange
        expect(UtilsModule.isLoading).toEqual(false);

        // Act
        UtilsModule.setLoading(true);

        // Assert
        expect(UtilsModule.isLoading).toEqual(true);
    });

    it("Should set snackbar and its content", async () => {
        // Arrange
        const snackbarNotification = new SnackbarModel()
            .setShowSnackbar(true)
            .setMessage(MESSAGE);

        // Act
        UtilsModule.setSnackbar(snackbarNotification);

        // Assert
        expect(UtilsModule.snackbarNotification).toMatchObject<SnackbarModel>(
            snackbarNotification
        );
    });

    it("Should get alert notification object", () => {
        // Arrange
        const state = UtilsModule.alertNotification;
        const result = UtilsModule.alert;

        // Assert
        expect(result).toEqual(state);
    });

    it("Should get loader", () => {
        // Arrange
        const state = UtilsModule.isLoading;
        const result = UtilsModule.loader;

        // Assert
        expect(result).toEqual(state);
    });

    it("Should get snackbar notification object", () => {
        // Arrange
        const state = UtilsModule.snackbarNotification;
        const result = UtilsModule.snackbar;

        // Assert
        expect(result).toMatchObject(state);
    });
});
