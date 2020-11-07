"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    comment: "required"
});

// Gather the date to validate
const data = {};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    comment: {
        required: "Le commentaire est obligatoire."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
