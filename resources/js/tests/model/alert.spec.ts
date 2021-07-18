import { EnumAlertType } from "@/enums/EnumAlertType";
import { AlertModel } from "@/models/Alert";

const MESSAGE = "Message for test purposes";
const BTN_TEXT = "See more";

describe("Alert model", () => {
    let alertObj: AlertModel;

    beforeEach(() => {
        alertObj = new AlertModel();
    });

    it("Should set show alert to true", () => {
        // Act
        alertObj.setShowAlert(true);

        // Assert
        expect(alertObj.showAlert).toBe(true);
    });

    it("Should set alert type", () => {
        // Act
        alertObj.setType(EnumAlertType.SUCCESS);

        // Assert
        expect(alertObj.type).toBe(EnumAlertType.SUCCESS);
    });

    it("Should set alert message", () => {
        // Act
        alertObj.setMessage(MESSAGE);

        // Assert
        expect(alertObj.message).toBe(MESSAGE);
    });

    it("Should set alert dismissible", () => {
        // Act
        alertObj.setDismissible(true);

        // Assert
        expect(alertObj.dismissible).toBe(true);
    });

    it("Should set alert callback", () => {
        // Arrange
        const callback = () => true;
        // Act
        alertObj.setCallback(callback);

        // Assert
        expect(alertObj.callback).toBe(callback);
    });

    it("Should set alert button text", () => {
        // Act
        alertObj.setBtnText(BTN_TEXT);

        // Assert
        expect(alertObj.btnText).toBe(BTN_TEXT);
    });
});
