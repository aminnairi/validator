"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    birthday: "date"
});

// Gather the date to validate
const data = {
    birthday: "invalid"
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    birthday: {
        date: "La date de naissance doit être une date valide."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
