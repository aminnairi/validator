"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    age: "minimum:18",
    comment: "minimum:15"
});

// Gather the date to validate
const data = {
    age: 16,
    comment: "Too short"
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    age: {
        minimum: "L'âge doit être au moins de 18."
    },

    comment: {
        minimum: "Le commentaire doit faire au moins 15 caractères."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
