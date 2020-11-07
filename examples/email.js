"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    user: "email"
});

// Gather the date to validate
const data = {
    user: "foo@bar"
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    user: {
        email: "Le nom d'utilisateur doit être une adresse email valide."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
