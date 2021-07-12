import { UtilsModule, Snackbar } from "@modules/Utils";

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
        const snackbarNotification = {
            showSnackbar: true,
            message: "Some message just for testing purposes."
        };

        // Act
        UtilsModule.setSnackbar(snackbarNotification);

        // Assert
        expect(UtilsModule.snackbarNotification).toMatchObject<Snackbar>(
            snackbarNotification
        );
        await new Promise(r => setTimeout(r, 4000));
        expect(UtilsModule.snackbarNotification).toStrictEqual({
            showSnackbar: false,
            message: null
        });
    });

    it("Should get alert", () => {
        // Arrange
        const state = UtilsModule.showAlert;

        // Act
        const result = UtilsModule.alert;

        // Assert
        expect(result).toEqual(state);
    });

    it("Should get loader", () => {
        // Arrange
        const state = UtilsModule.isLoading;

        // Act
        const result = UtilsModule.loader;

        // Assert
        expect(result).toEqual(state);
    });

    it("Should get snackbar notification object", () => {
        // Arrange
        const state = UtilsModule.snackbarNotification;

        // Act
        const result = UtilsModule.snackbar;

        // Assert
        expect(result).toMatchObject(state);
    });
});
