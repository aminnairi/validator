"use strict";

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
    constructor(rules = {}, translations = {}) {
        this.rules = rules;
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
    validate(data) {
        const validationErrors = Object.entries(this.rules).reduce((errors, [property, rule]) => {
            const rules = rule.split("|").map(currentRule => currentRule.trim());
            const value = data[property];

            const additionalErrors = rules.reduce((currentErrors, currentRule) => {
                if ("required" === currentRule) {
                    if ("undefined" === typeof value || null === value) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRule]) {
                            error = `${property} is required.`;
                        } else {
                            error = this.translations[property][currentRule].replace("{}", property);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("integer" === currentRule) {
                    if ("undefined" !== typeof value && null !== value && !Number.isInteger(Number(value))) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRule]) {
                            error = `${property} should be an integer.`;
                        } else {
                            error = this.translations[property][currentRule].replace("{}", property);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("email" === currentRule) {
                    /* eslint-disable-next-line */
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u;

                    if ("string" === typeof value && !pattern.test(value)) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRule]) {
                            error = `${property} should be a valid email.`;
                        } else {
                            error = this.translations[property][currentRule].replace("{}", property);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("password" === currentRule) {
                    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/u;

                    if ("string" === typeof value && !pattern.test(value)) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRule]) {
                            error = `${property} should contain at least digits, lower & upper letters, symbols and at least 8 characters.`;
                        } else {
                            error = this.translations[property][currentRule].replace("{}", property);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("date" === currentRule) {
                    if ("undefined" !== typeof value && null !== value && Number.isNaN(Date.parse(value))) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRule]) {
                            error = `${property} should be a valid date.`;
                        } else {
                            error = this.translations[property][currentRule].replace("{}", property);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("string" === currentRule) {
                    if ("string" !== typeof value) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRule]) {
                            error = `${property} should be a string.`;
                        } else {
                            error = this.translations[property][currentRule].replace("{}", property);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return errors;
                }

                if (currentRule.startsWith("same")) {
                    const [currentRuleName, maybeSame] = currentRule.split(":");

                    if ("undefined" === typeof maybeSame) {
                        throw new Error("No value defined for the rule \"same\".");
                    }

                    const same = maybeSame;
                    const sameValue = data[same];

                    if ("undefined" !== typeof value && null !== value && sameValue !== value) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRuleName]) {
                            error = `${property} should be the same as ${same}.`;
                        } else {
                            error = this.translations[property][currentRuleName].replace("{}", property).replace("{}", same);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                if (currentRule.startsWith("different")) {
                    const [currentRuleName, maybeDifferent] = currentRule.split(":");

                    if ("undefined" === typeof maybeDifferent) {
                        throw new Error("No value defined for the rule \"different\".");
                    }

                    const different = maybeDifferent;
                    const differentValue = data[different];

                    if ("undefined" !== typeof value && null !== value && differentValue === value) {
                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRuleName]) {
                            error = `${property} should be different than ${different}.`;
                        } else {
                            error = this.translations[property][currentRuleName].replace("{}", property).replace("{}", different);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                if (currentRule.startsWith("minimum")) {
                    const [currentRuleName, maybeMinimum] = currentRule.split(":");

                    if ("undefined" === typeof maybeMinimum) {
                        throw new Error("No value defined for the rule \"minimum\".");
                    }

                    const maybeMinimumNumber = Number(maybeMinimum);

                    if (!Number.isFinite(maybeMinimumNumber)) {
                        throw new Error("No number defined for the rule \"minimum\".");
                    }

                    const minimum = maybeMinimumNumber;
                    const typeofValue = typeof value;

                    if ("undefined" !== typeofValue && null !== value) {
                        if ("number" === typeof value && value < minimum) {
                            let error = null;

                            if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRuleName]) {
                                error = `${property} should be at least equals to ${minimum}.`;
                            } else {
                                error = this.translations[property][currentRuleName].replace("{}", property).replace("{}", minimum);
                            }

                            return {
                                ...currentErrors,
                                [property]: [
                                    ...currentErrors[property] || [],
                                    error
                                ]
                            };
                        }

                        if ("string" === typeofValue && value.length < minimum) {
                            let error = null;

                            if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRuleName]) {
                                error = `${property} should have at least ${minimum} characters.`;
                            } else {
                                error = this.translations[property][currentRuleName].replace("{}", property).replace("{}", minimum);
                            }

                            return {
                                ...currentErrors,
                                [property]: [
                                    ...currentErrors[property] || [],
                                    error
                                ]
                            };
                        }
                    }

                    return currentErrors;
                }

                if (currentRule.startsWith("maximum")) {
                    const [currentRuleName, maybeMaximum] = currentRule.split(":");

                    if ("undefined" === typeof maybeMaximum) {
                        throw new Error("No value defined for the rule \"maximum\".");
                    }

                    const maybeMaximumNumber = Number(maybeMaximum);

                    if (!Number.isFinite(maybeMaximumNumber)) {
                        throw new Error("No number defined for the rule \"maximum\".");
                    }

                    const maximum = maybeMaximumNumber;
                    const typeofValue = typeof value;

                    if ("undefined" !== typeofValue && null !== value) {
                        if ("number" === typeofValue && value > maximum) {
                            let error = null;

                            if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRuleName]) {
                                error = `${property} should be at most equals to ${maximum}.`;
                            } else {
                                error = this.translations[property][currentRuleName].replace("{}", property).replace("{}", maximum);
                            }

                            return {
                                ...currentErrors,
                                [property]: [
                                    ...currentErrors[property] || [],
                                    error
                                ]
                            };
                        }

                        if ("string" === typeofValue && value.length > maximum) {
                            return {
                                ...currentErrors,
                                [property]: [
                                    ...currentErrors[property] || [],
                                    `${property} should have at most ${maximum} characters.`
                                ]
                            };
                        }
                    }

                    return currentErrors;
                }


                if (currentRule.startsWith("in")) {
                    const [currentRuleName, maybeIn] = currentRule.split(":");

                    if ("undefined" === typeof maybeIn) {
                        throw new Error(`No value defined for the rule "in".`);
                    }

                    const inValues = maybeIn.split(",").map(currentValue => currentValue.trim());

                    if ("undefined" !== typeof value && null !== value && !inValues.includes(value)) {
                        const inValuesText = inValues.join(", ");

                        let error = null;

                        if ("undefined" === typeof this.translations[property] || "undefined" === typeof this.translations[property][currentRuleName]) {
                            error = `${property} should be one of the following: ${inValuesText}.`;
                        } else {
                            error = this.translations[property][currentRuleName].replace("{}", property).replace("{}", inValuesText);
                        }

                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                error
                            ]
                        };
                    }

                    return currentErrors;
                }

                throw new Error(`Unrecognized rule: ${currentRule}.`);
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
