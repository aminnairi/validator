"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    confirmation: "same:password",
    password: "password"
});

// Gather the date to validate
const data = {
    confirmation: "invalid",
    password: "abcABC123!@#"
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    confirmation: {
        same: "Les mots de passes ne correspondent pas."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
