"use strict";

const {DateRule} = require("./rules/DateRule.js");
const {DifferentRule} = require("./rules/DifferentRule.js");
const {EmailRule} = require("./rules/EmailRule.js");
const {InRule} = require("./rules/InRule.js");
const {IntegerRule} = require("./rules/IntegerRule.js");
const {MaximumRule} = require("./rules/MaximumRule.js");
const {MinimumRule} = require("./rules/MinimumRule.js");
const {PasswordRule} = require("./rules/PasswordRule.js");
const {RequiredRule} = require("./rules/RequiredRule.js");
const {SameRule} = require("./rules/SameRule.js");
const {StringRule} = require("./rules/StringRule.js");

/**
 * Rules for validating an object of values.
 */
exports.Validator = class Validator {
    /**
     * @param {Record<string, string>} rules
     * @param {Record<string, string>} translations
     *
     * @example
     * const validator = new Validator({
     *      email: "required|email"
     *      password: "required|password"
     *      confirmation: "required|same:password"
     * });
     */
    constructor(rules) {
        this.rules = rules;
        this.translations = {};
    }

    setTranslations(translations) {
        this.translations = translations;
    }

    /**
     * @param {Record<string, any>} data
     *
     * @return {string[]|null}
     *
     * @example
     * validator.validate({
     *      email: "email@domain.com"
     *      password: "abcABC123"
     * });
     */
    validate(attributes) {
        const {translations} = this;

        const validationErrors = Object.entries(this.rules).reduce((errors, [attributeName, rule]) => {
            const rules = rule.split("|").map(currentRule => currentRule.trim());

            const additionalErrors = rules.reduce((currentErrors, currentRule) => {
                const requiredRule = new RequiredRule({attributeName, attributes, translations});

                if (requiredRule.match(currentRule) && requiredRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            requiredRule.getError()
                        ]
                    };
                }

                const integerRule = new IntegerRule({attributeName, attributes, translations});

                if (integerRule.match(currentRule) && integerRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            integerRule.getError()
                        ]
                    };
                }

                const emailRule = new EmailRule({attributeName, attributes, translations});

                if (emailRule.match(currentRule) && emailRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            emailRule.getError()
                        ]
                    };
                }

                const passwordRule = new PasswordRule({attributeName, attributes, translations});

                if (passwordRule.match(currentRule) && passwordRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            passwordRule.getError()
                        ]
                    };
                }

                const dateRule = new DateRule({attributeName, attributes, translations});

                if (dateRule.match(currentRule) && dateRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            dateRule.getError()
                        ]
                    };
                }

                const stringRule = new StringRule({attributeName, attributes, translations});

                if (stringRule.match(currentRule) && stringRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            stringRule.getError()
                        ]
                    };
                }

                const sameRule = new SameRule({attributeName, attributes, translations});

                if (sameRule.match(currentRule) && sameRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            sameRule.getError()
                        ]
                    };
                }

                const differentRule = new DifferentRule({attributeName, attributes, translations});

                if (differentRule.match(currentRule) && differentRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            differentRule.getError()
                        ]
                    };
                }

                const minimumRule = new MinimumRule({attributeName, attributes, translations});

                if (minimumRule.match(currentRule) && minimumRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            minimumRule.getError()
                        ]
                    };
                }

                const maximumRule = new MaximumRule({attributeName, attributes, translations});

                if (maximumRule.match(currentRule) && maximumRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            maximumRule.getError()
                        ]
                    };
                }

                const inRule = new InRule({attributeName, attributes, translations});
                if (inRule.match(currentRule) && inRule.hasError()) {
                    return {
                        ...currentErrors,
                        [attributeName]: [
                            ...currentErrors[attributeName] || [],
                            inRule.getError()
                        ]
                    };
                }

                return currentErrors;
            }, {});

            return {
                ...errors,
                ...additionalErrors
            };
        }, {});

        if (0 === Object.keys(validationErrors).length) {
            return null;
        }

        return validationErrors;
    }
};
