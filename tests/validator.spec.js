"use strict";

const {Validator} = require("../src/validator.js");

describe("validator.js", () => {
    it("should return true", () => {
        expect.assertions(1);

        expect(true).toStrictEqual(true);
    });

    describe("required", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({username: "required"});
            const data = {username: "username"};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({username: "required"});
            const data = {};
            const result = validator.validate(data);
            const expectation = {username: ["username is required."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {username: "required"};
            const translations = {username: {required: "Le nom d'utilisateur est obligatoire."}};
            const validator = new Validator(rules, translations);
            const data = {};
            const result = validator.validate(data);
            const expectation = {username: ["Le nom d'utilisateur est obligatoire."]};

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("email", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({email: "email"});
            const data = {email: "user@domain.com"};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({email: "email"});
            const data = {email: "user@domain"};
            const result = validator.validate(data);
            const expectation = {email: ["email should be a valid email."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {email: "email"};
            const translations = {email: {email: "L'adresse email est obligatoire."}};
            const validator = new Validator(rules, translations);
            const data = {email: "user@domain"};
            const result = validator.validate(data);
            const expectation = {email: ["L'adresse email est obligatoire."]};

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("password", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({password: "password"});
            const data = {password: "abcABC123!@#"};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({password: "password"});
            const data = {password: "abcABC123"};
            const result = validator.validate(data);
            const expectation = {password: ["password should contain at least digits, lower & upper letters, symbols and at least 8 characters."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {password: "password"};
            const translations = {password: {password: "Le mot de passe doit comporter au moins une lettre majuscule, une lettre minuscule, un chiffre, un symbole et 8 caractères."}};
            const validator = new Validator(rules, translations);
            const data = {password: "abcABC123"};
            const result = validator.validate(data);
            const expectation = {password: ["Le mot de passe doit comporter au moins une lettre majuscule, une lettre minuscule, un chiffre, un symbole et 8 caractères."]};

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("same", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({confirmation: "same:password", password: "password"});
            const data = {confirmation: "abcABC123!@#", password: "abcABC123!@#"};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({confirmation: "same:password", password: "password"});
            const data = {confirmation: "confirmation", password: "abcABC123!@#"};
            const result = validator.validate(data);
            const expectation = {confirmation: ["confirmation should be the same as password."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {confirmation: "same:password", password: "password"};
            const translations = {confirmation: {same: "Les mots de passe ne correspondent pas."}};
            const validator = new Validator(rules, translations);
            const data = {confirmation: "confirmation", password: "abcABC123!@#"};
            const result = validator.validate(data);
            const expectation = {confirmation: ["Les mots de passe ne correspondent pas."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should throw an error if the rule value is not defined", () => {
            expect.assertions(1);

            const validator = new Validator({confirmation: "same", password: "password"});
            const data = {confirmation: "abcABC123!@#", password: "abcABC123!@#"};
            const callback = () => validator.validate(data);
            const error = new Error("No value defined for the rule \"same\".");

            expect(callback).toThrow(error);
        });
    });

    describe("different", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({password: "different:username", username: "required"});
            const data = {password: "abcABC123!@#", username: "johndoe"};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({password: "different:username", username: "required"});
            const data = {password: "johndoe", username: "johndoe"};
            const result = validator.validate(data);
            const expectation = {password: ["password should be different than username."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {password: "different:username", username: "required"};
            const translations = {password: {different: "Le mot de passe doit être différent du nom d'utilisateur."}};
            const validator = new Validator(rules, translations);
            const data = {password: "johndoe", username: "johndoe"};
            const result = validator.validate(data);
            const expectation = {password: ["Le mot de passe doit être différent du nom d'utilisateur."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should throw an error if the rule value is not defined", () => {
            expect.assertions(1);

            const validator = new Validator({password: "different", username: "required"});
            const data = {password: "johndoe", username: "johndoe"};
            const callback = () => validator.validate(data);
            const error = new Error("No value defined for the rule \"different\".");

            expect(callback).toThrow(error);
        });
    });

    describe("minimum", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({age: "minimum:18"});
            const data = {age: 18};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when the value is a string", () => {
            expect.assertions(1);

            const validator = new Validator({age: "minimum:18"});
            const data = {age: "age"};
            const result = validator.validate(data);
            const expectation = {age: ["age should have at least 18 characters."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when the value is a string", () => {
            expect.assertions(1);

            const rules = {age: "minimum:18"};
            const translations = {age: {minimum: "L'âge doit faire au minimum 18 caractères."}};
            const validator = new Validator(rules, translations);
            const data = {age: "age"};
            const result = validator.validate(data);
            const expectation = {age: ["L'âge doit faire au minimum 18 caractères."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when the value is an integer", () => {
            expect.assertions(1);

            const rules = {age: "minimum:18"};
            const validator = new Validator(rules);
            const data = {age: 16};
            const result = validator.validate(data);
            const expectation = {age: ["age should be at least equals to 18."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when the value is an integer", () => {
            expect.assertions(1);

            const rules = {age: "minimum:18"};
            const translations = {age: {minimum: "L'âge doit être d'au moins 18."}};
            const validator = new Validator(rules, translations);
            const data = {age: 16};
            const result = validator.validate(data);
            const expectation = {age: ["L'âge doit être d'au moins 18."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should throw an error if the rule value is not defined", () => {
            expect.assertions(1);

            const validator = new Validator({age: "minimum"});
            const data = {age: 18};
            const callback = () => validator.validate(data);
            const error = new Error("No value defined for the rule \"minimum\".");

            expect(callback).toThrow(error);
        });

        it("should throw an error if the rule value is not a number", () => {
            expect.assertions(1);

            const validator = new Validator({age: "minimum:age"});
            const data = {age: 18};
            const callback = () => validator.validate(data);
            const error = new Error("No number defined for the rule \"minimum\".");

            expect(callback).toThrow(error);
        });
    });

    describe("maximum", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({age: "maximum:99"});
            const data = {age: 99};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when the value is a string", () => {
            expect.assertions(1);

            const validator = new Validator({age: "maximum:-10"});
            const data = {age: "age"};
            const result = validator.validate(data);
            const expectation = {age: ["age should have at most -10 characters."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({age: "maximum:99"});
            const data = {age: 100};
            const result = validator.validate(data);
            const expectation = {age: ["age should be at most equals to 99."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {age: "maximum:99"};
            const translations = {age: {maximum: "L'âge doit être au maximum de 99."}};
            const validator = new Validator(rules, translations);
            const data = {age: 100};
            const result = validator.validate(data);
            const expectation = {age: ["L'âge doit être au maximum de 99."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should throw an error if the rule value is not defined", () => {
            expect.assertions(1);

            const validator = new Validator({age: "maximum"});
            const data = {age: 100};
            const callback = () => validator.validate(data);
            const error = new Error("No value defined for the rule \"maximum\".");

            expect(callback).toThrow(error);
        });

        it("should throw an error if the rule value is not a number", () => {
            expect.assertions(1);

            const validator = new Validator({age: "maximum:age"});
            const data = {age: 100};
            const callback = () => validator.validate(data);
            const error = new Error("No number defined for the rule \"maximum\".");

            expect(callback).toThrow(error);
        });
    });

    describe("in", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({role: "in:ADMIN,USER,SUPERUSER"});
            const data = {role: "ADMIN"};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({role: "in:ADMIN,USER,SUPERUSER"});
            const data = {role: "GUEST"};
            const result = validator.validate(data);
            const expectation = {role: [`role should be one of the following: ADMIN, USER, SUPERUSER.`]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {role: "in:ADMIN,USER,SUPERUSER"};
            const translations = {role: {in: "Le rôle doit être soit ADMIN, USER ou SUPERUSER."}};
            const validator = new Validator(rules, translations);
            const data = {role: "GUEST"};
            const result = validator.validate(data);
            const expectation = {role: ["Le rôle doit être soit ADMIN, USER ou SUPERUSER."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should throw an error if the rule value is not defined", () => {
            expect.assertions(1);

            const validator = new Validator({role: "in"});
            const data = {role: "ADMIN"};
            const callback = () => validator.validate(data);
            const error = new Error("No value defined for the rule \"in\".");

            expect(callback).toThrow(error);
        });
    });

    describe("integer", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({status: "integer"});
            const data = {status: 12};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({status: "integer"});
            const data = {status: "GUEST"};
            const result = validator.validate(data);
            const expectation = {status: ["status should be an integer."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {status: "integer"};
            const translations = {status: {integer: "Le status doit être un entier."}};
            const validator = new Validator(rules, translations);
            const data = {status: "GUEST"};
            const result = validator.validate(data);
            const expectation = {status: ["Le status doit être un entier."]};

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("date", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({birthday: "date"});
            const data = {birthday: new Date().toString()};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({birthday: "date"});
            const data = {birthday: "tomorrow"};
            const result = validator.validate(data);
            const expectation = {birthday: ["birthday should be a valid date."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {birthday: "date"};
            const translations = {birthday: {date: "La date de naissance doit être au format date."}};
            const validator = new Validator(rules, translations);
            const data = {birthday: "tomorrow"};
            const result = validator.validate(data);
            const expectation = {birthday: ["La date de naissance doit être au format date."]};

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("string", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator = new Validator({name: "string"});
            const data = {name: "name"};
            const result = validator.validate(data);
            const expectation = null;

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator = new Validator({name: "string"});
            const data = {name: 42};
            const result = validator.validate(data);
            const expectation = {name: ["name should be a string."]};

            expect(result).toStrictEqual(expectation);
        });

        it("should return a translated validation error when there is one", () => {
            expect.assertions(1);

            const rules = {name: "string"};
            const translations = {name: {string: "Le nom doit être une chaîne de caractères."}};
            const validator = new Validator(rules, translations);
            const data = {name: 42};
            const result = validator.validate(data);
            const expectation = {name: ["Le nom doit être une chaîne de caractères."]};

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("unrecognized rule", () => {
        it("should throw if encountering an unrecognized rule", () => {
            expect.assertions(1);

            const validator = new Validator({username: "undefined"});
            const data = {username: "username"};
            const callback = () => validator.validate(data);
            const error = new Error("Unrecognized rule: undefined.");

            expect(callback).toThrow(error);
        });
    });
});
