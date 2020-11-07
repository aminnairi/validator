"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    age: "maximum:99",
    comment: "maximum:15"
});

// Gather the date to validate
const data = {
    age: 100,
    comment: "Too long comment on a product I never bought."
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    age: {
        maximum: "L'âge doit être au plus de 99."
    },

    comment: {
        maximum: "Le commentaire doit faire au maximum 15 caractères."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
