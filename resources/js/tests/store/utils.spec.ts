import { UtilsModule } from "@modules/Utils";
import { SnackbarModel } from "@/models/Snackbar";

const MESSAGE = "Message for test purposes";

describe("Utils store", () => {
    it("Should set alert to true", () => {
        // Arrange
        expect(UtilsModule.showAlert).toEqual(false);

        // Act
        UtilsModule.setAlert(true);

        // Assert
        expect(UtilsModule.showAlert).toEqual(true);
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

    it("Should get alert", () => {
        // Arrange
        const state = UtilsModule.showAlert;
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
