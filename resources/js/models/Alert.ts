import { EnumAlertType } from "@/enums/EnumAlertType";

export class AlertModel {
    showAlert = false;
    type = EnumAlertType.SUCCESS;
    message = "";
    dismissible = false;
    callback: Function | null = null;
    btnText: string = "";

    setShowAlert(showAlert: boolean): AlertModel {
        this.showAlert = showAlert;
        return this;
    }

    setType(type: EnumAlertType): AlertModel {
        this.type = type;
        return this;
    }

    setMessage(message: string): AlertModel {
        this.message = message;
        return this;
    }

    setDismissible(dismissible: boolean): AlertModel {
        this.dismissible = dismissible;
        return this;
    }

    setCallback(callback: Function): AlertModel {
        this.callback = callback;
        return this;
    }

    setBtnText(text: string): AlertModel {
        this.btnText = text;
        return this;
    }
}
