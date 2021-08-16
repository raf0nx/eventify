import { extend } from "vee-validate";

import {
    alpha_spaces,
    confirmed,
    email,
    min,
    max,
    required
} from "vee-validate/dist/rules";

extend("alpha_spaces", {
    ...alpha_spaces,
    message: "{_field_} should contain only alphabetic characters or spaces"
});

extend("confirmed", {
    ...confirmed,
    message: "Please make sure your passwords match"
});

extend("email", {
    ...email,
    message: "{_field_} seems not to be valid"
});

extend("min", {
    ...min,
    message: "{_field_} must be at least {length} characters"
});

extend("max", {
    ...max,
    message: "{_field_} must not be greater than {length} characters"
});

extend("required", {
    ...required,
    message: "{_field_} is required"
});

extend("number", {
    message: "{_field_} must contain at least one number",
    validate: value => {
        const numberRegex = new RegExp("^(?=.*[0-9])");
        return numberRegex.test(value);
    }
});

extend("uppercase", {
    message: "{_field_} must contain at least one uppercase character",
    validate: value => {
        const uppercaseRegex = new RegExp("^(?=.*[A-Z])");
        return uppercaseRegex.test(value);
    }
});

extend("special_char", {
    message: "{_field_} must contain at least one special character",
    validate: value => {
        const specialCharRegex = new RegExp("^(?=.*[!@#$%^&*])(?=.{8,})");
        return specialCharRegex.test(value);
    }
});
