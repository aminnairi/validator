"use strict";

// Import the library
const {Validator} = require("../src/validator.js");

// Set the validation rules
const validator = new Validator({
    password: "different:username",
    username: "required"
});

// Gather the date to validate
const data = {
    password: "foobar",
    username: "foobar"
};

// Validate the data
const errors = validator.validate(data);

console.log(errors);

// Translate the errors if needed
validator.setTranslations({
    password: {
        different: "Le mot de passe doit être différent du nomm d'utilisateur."
    }
});

// Validate the data
const translatedErrors = validator.validate(data);

console.log(translatedErrors);
