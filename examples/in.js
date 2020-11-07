"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    role: "in:USER,SUPERUSER,ADMIN"
});

// Gather the date to validate
const data = {
    role: "MODERATOR"
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    role: {
        in: "Le rôle doit être USER, SUPERUSER ou ADMIN."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
