import { SnackbarModel } from "@/models/Snackbar";
import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";

const MESSAGE = "Message for test purposes";

describe("Snackbar model", () => {
    let snackbarObj: SnackbarModel;

    beforeEach(() => {
        snackbarObj = new SnackbarModel();
    });

    it("Should set show snackbar to true", () => {
        // Act
        snackbarObj.setShowSnackbar(true);

        // Assert
        expect(snackbarObj.showSnackbar).toBe(true);
    });

    it("Should set snackbar message", () => {
        // Act
        snackbarObj.setMessage(MESSAGE);

        // Assert
        expect(snackbarObj.message).toBe(MESSAGE);
    });

    it("Should set snackbar icon", () => {
        // Act
        snackbarObj.setIcon(EnumSnackbarIcon.SUCCESS);

        // Assert
        expect(snackbarObj.icon).toBe(EnumSnackbarIcon.SUCCESS);
    });

    it("Should set snackbar color", () => {
        // Act
        snackbarObj.setColor(EnumSnackbarColor.SUCCESS);

        // Assert
        expect(snackbarObj.color).toBe(EnumSnackbarColor.SUCCESS);
    });
});
