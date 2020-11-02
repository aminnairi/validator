"use strict";

const {Validator} = require("./validator.js");

describe("validator.js", () => {
    it("should return true", () => {
        expect.assertions(1);

        expect(true).toStrictEqual(true);
    });

    describe("required", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator     = new Validator({username: "required"});
            const data          = {username: "username"};
            const result        = validator.validate(data);
            const expectation   = null

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator     = new Validator({username: "required"});
            const data          = {};
            const result        = validator.validate(data);
            const expectation   = ["username is required."];

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("email", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator     = new Validator({email: "email"});
            const data          = {email: "user@domain.com"};
            const result        = validator.validate(data);
            const expectation   = null

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator     = new Validator({email: "email"});
            const data          = {email: "user@domain"};
            const result        = validator.validate(data);
            const expectation   = ["email should be a valid email."];

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("password", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator     = new Validator({password: "password"});
            const data          = {password: "abcABC123!@#"};
            const result        = validator.validate(data);
            const expectation   = null

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator     = new Validator({password: "password"});
            const data          = {password: "abcABC123"};
            const result        = validator.validate(data);
            const expectation   = ["password should contain at least digits, lower & upper letters, symbols and at least 8 characters."];

            expect(result).toStrictEqual(expectation);
        });
    });

    describe("same", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator     = new Validator({password: "password", confirmation: "same:password"});
            const data          = {password: "abcABC123!@#", confirmation: "abcABC123!@#"};
            const result        = validator.validate(data);
            const expectation   = null

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator     = new Validator({password: "password", confirmation: "same:password"});
            const data          = {password: "abcABC123!@#", confirmation: "confirmation"};
            const result        = validator.validate(data);
            const expectation   = ["confirmation should be the same as password."];

            expect(result).toStrictEqual(expectation);
        });

        it("should throw an error if the rule value is not defined", () => {
            expect.assertions(1);

            const validator = new Validator({password: "password", confirmation: "same"});
            const data = {password: "abcABC123!@#", confirmation: "abcABC123!@#"};
            const callback = () => validator.validate(data);
            const error = new Error("No value defined for the rule \"same\".");

            expect(callback).toThrow(error);
        });
    });

    describe("minimum", () => {
        it("should return null when no validation errors are found", () => {
            expect.assertions(1);

            const validator     = new Validator({age: "minimum:18"});
            const data          = {age: 18};
            const result        = validator.validate(data);
            const expectation   = null

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when the value is a string", () => {
            expect.assertions(1);

            const validator     = new Validator({age: "minimum:18"});
            const data          = {age: "age"};
            const result        = validator.validate(data);
            const expectation   = ["age should be at least equals to 18."];

            expect(result).toStrictEqual(expectation);
        });

        it("should return a validation error when there is one", () => {
            expect.assertions(1);

            const validator     = new Validator({age: "minimum:18"});
            const data          = {age: 16};
            const result        = validator.validate(data);
            const expectation   = ["age should be at least equals to 18."];

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
