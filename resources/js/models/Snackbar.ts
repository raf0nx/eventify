import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";
import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";

export class SnackbarModel {
    showSnackbar = false;
    message = "";
    icon = EnumSnackbarIcon.SUCCESS;
    color = EnumSnackbarColor.SUCCESS;

    setShowSnackbar(value: boolean): SnackbarModel {
        this.showSnackbar = value;
        return this;
    }

    setMessage(message: string): SnackbarModel {
        this.message = message;
        return this;
    }

    setIcon(icon: EnumSnackbarIcon): SnackbarModel {
        this.icon = icon;
        return this;
    }

    setColor(color: EnumSnackbarColor): SnackbarModel {
        this.color = color;
        return this;
    }
}
