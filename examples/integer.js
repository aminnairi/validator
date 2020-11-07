"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    age: "integer"
});

// Gather the date to validate
const data = {
    age: 42.69
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    age: {
        integer: "L'âge doit être un entier."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
