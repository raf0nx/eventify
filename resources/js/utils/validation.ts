import { extend } from "vee-validate";

import { alpha_spaces, confirmed, email, min, required } from "vee-validate/dist/rules";

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

extend("required", {
    ...required,
    message: "{_field_} is required"
});
