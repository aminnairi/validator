"use strict";

/**
 * Rules for validating an object of values.
 */
exports.Validator = class Validator {
    /**
     * @param {Record<string, string>} rules
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
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} is required.`
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("integer" === currentRule) {
                    if ("undefined" !== typeof value && null !== value && !Number.isInteger(Number(value))) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should be an integer.`
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("email" === currentRule) {
                    /* eslint-disable-next-line */
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u;

                    if ("string" === typeof value && !pattern.test(value)) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should be a valid email.`
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("password" === currentRule) {
                    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/u;

                    if ("string" === typeof value && !pattern.test(value)) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should contain at least digits, lower & upper letters, symbols and at least 8 characters.`
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("date" === currentRule) {
                    if ("undefined" !== typeof value && null !== value && Number.isNaN(Date.parse(value))) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should be a valid date.`
                            ]
                        };
                    }

                    return currentErrors;
                }

                if ("string" === currentRule) {
                    if ("string" !== typeof value) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should be a string.`
                            ]
                        };
                    }

                    return errors;
                }

                if (currentRule.startsWith("same")) {
                    const [, maybeSame] = currentRule.split(":");

                    if ("undefined" === typeof maybeSame) {
                        throw new Error("No value defined for the rule \"same\".");
                    }

                    const same = maybeSame;
                    const sameValue = data[same];

                    if ("undefined" !== typeof value && null !== value && sameValue !== value) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should be the same as ${same}.`
                            ]
                        };
                    }

                    return currentErrors;
                }

                if (currentRule.startsWith("different")) {
                    const [, maybeDifferent] = currentRule.split(":");

                    if ("undefined" === typeof maybeDifferent) {
                        throw new Error("No value defined for the rule \"different\".");
                    }

                    const different = maybeDifferent;
                    const differentValue = data[different];

                    if ("undefined" !== typeof value && null !== value && differentValue === value) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should be different than ${different}.`
                            ]
                        };
                    }

                    return currentErrors;
                }

                if (currentRule.startsWith("minimum")) {
                    const [, maybeMinimum] = currentRule.split(":");

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
                            return {
                                ...currentErrors,
                                [property]: [
                                    ...currentErrors[property] || [],
                                    `${property} should be at least equals to ${minimum}.`
                                ]
                            };
                        }

                        if ("string" === typeofValue && value.length < minimum) {
                            return {
                                ...currentErrors,
                                [property]: [
                                    ...currentErrors[property] || [],
                                    `${property} should have at least ${minimum} characters.`
                                ]
                            };
                        }
                    }

                    return currentErrors;
                }

                if (currentRule.startsWith("maximum")) {
                    const [, maybeMaximum] = currentRule.split(":");

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
                            return {
                                ...currentErrors,
                                [property]: [
                                    ...currentErrors[property] || [],
                                    `${property} should be at most equals to ${maximum}.`
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
                    const [, maybeIn] = currentRule.split(":");

                    if ("undefined" === typeof maybeIn) {
                        throw new Error(`No value defined for the rule "in".`);
                    }

                    const inValues = maybeIn.split(",").map(currentValue => currentValue.trim());

                    if ("undefined" !== typeof value && null !== value && !inValues.includes(value)) {
                        return {
                            ...currentErrors,
                            [property]: [
                                ...currentErrors[property] || [],
                                `${property} should be one of the following: ${inValues.join(", ")}.`
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
