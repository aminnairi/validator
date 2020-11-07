"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    username: "string"
});

// Gather the date to validate
const data = {
    username: 123
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    username: {
        string: "Le nom d'utilisateur doit être une chaîne de caractères."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
