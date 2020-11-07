"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    password: "password"
});

// Gather the date to validate
const data = {
    password: "abcABC123"
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    password: {
        password: "Le mot de passe doit contenir au moins un chiffre, un symbole, une lettre majuscule et minuscule et faire au moins 8 caractères."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
