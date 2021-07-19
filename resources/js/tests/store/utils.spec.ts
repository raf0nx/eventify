import { UtilsModule } from "@modules/Utils";
import { SnackbarModel } from "@/models/Snackbar";
import { AlertModel } from "@/models/Alert";

const MESSAGE = "Message for test purposes";

describe("Utils module", () => {
    it("Should set alert and its content", () => {
        // Arrange
        const alertModel = new AlertModel()
            .setShowAlert(true)
            .setMessage(MESSAGE);

        // Act
        UtilsModule.setAlert(alertModel);

        // Assert
        expect(UtilsModule.alert).toEqual(alertModel);
    });

    it("Should set loader", () => {
        // Act
        UtilsModule.setLoader(true);

        // Assert
        expect(UtilsModule.loader).toEqual(true);
    });

    it("Should set snackbar and its content", () => {
        // Arrange
        const snackbarModel = new SnackbarModel()
            .setShowSnackbar(true)
            .setMessage(MESSAGE);

        // Act
        UtilsModule.setSnackbar(snackbarModel);

        // Assert
        expect(UtilsModule.snackbar).toMatchObject<SnackbarModel>(
            snackbarModel
        );
    });

    it("Should get alert notification", () => {
        // Arrange
        const alertModel = new AlertModel();

        // Act
        UtilsModule.setAlert(alertModel);

        // Assert
        const result = UtilsModule.alert;
        expect(result).toEqual(alertModel);
    });

    it("Should get loader", () => {
        // Arrange
        const isLoading = true;

        // Act
        UtilsModule.setLoader(isLoading);
        
        // Assert
        const result = UtilsModule.loader;
        expect(result).toEqual(isLoading);
    });

    it("Should get snackbar notification", () => {
        // Arrange
        const snackbarModel = new SnackbarModel();

        // Act
        UtilsModule.setSnackbar(snackbarModel);
        
        // Assert
        const result = UtilsModule.snackbar;
        expect(result).toMatchObject(snackbarModel);
    });
});
