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
            const rules = rule.split("|").map(rule => rule.trim());
            const value = data[property];

            const additionalErrors = rules.reduce((errors, rule) => {
                if (rule === "required") {
                    if (typeof value === "undefined") {
                        return [
                            ...errors,
                            `${property} is required.`
                        ];
                    }

                    return errors;
                }

                if (rule === "email") {
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if (typeof value !== "string" || !pattern.test(value)) {
                        return [
                            ...errors,
                            `${property} should be a valid email.`
                        ];
                    }

                    return errors;
                }

                if (rule === "password") {
                    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;

                    if (typeof value !== "string" || !pattern.test(value)) {
                        return [
                            ...errors,
                            `${property} should contain at least digits, lower & upper letters, symbols and at least 8 characters.`
                        ];
                    }

                    return errors;
                }

                if (rule.startsWith("same")) {
                    const [, maybeSame] = rule.split(":");

                    if (typeof maybeSame === "undefined") {
                        throw new Error("No value defined for the rule \"same\".");
                    }

                    const same = maybeSame;
                    const sameValue = data[same];

                    if (sameValue !== value) {
                        return [
                            ...errors,
                            `${property} should be the same as ${same}.`
                        ];
                    }

                    return errors;
                }

                if (rule.startsWith("minimum")) {
                    const [, maybeMinimum] = rule.split(":");

                    if (typeof maybeMinimum === "undefined") {
                        throw new Error("No value defined for the rule \"minimum\".");
                    }

                    const maybeMinimumNumber = Number(maybeMinimum);

                    if (!Number.isFinite(maybeMinimumNumber)) {
                        throw new Error("No number defined for the rule \"minimum\".");
                    }

                    const minimum = maybeMinimumNumber;
                    const valueNumber = Number(value) || 0;

                    if (valueNumber < minimum) {
                        return [
                            ...errors,
                            `${property} should be at least equals to ${minimum}.`
                        ];
                    }

                    return errors;
                }

                if (rule.startsWith("maximum")) {
                    const [, maybeMaximum] = rule.split(":");

                    if (typeof maybeMaximum === "undefined") {
                        throw new Error("No value defined for the rule \"maximum\".");
                    }

                    const maybeMaximumNumber = Number(maybeMaximum);

                    if (!Number.isFinite(maybeMaximumNumber)) {
                        throw new Error("No number defined for the rule \"maximum\".");
                    }

                    const maximum = maybeMaximumNumber;
                    const valueNumber = Number(value) || 0;

                    if (valueNumber > maximum) {
                        return [
                            ...errors,
                            `${property} should be at most equals to ${maximum}.`
                        ];
                    }

                    return errors;
                }

                throw new Error(`Unrecognized rule: ${rule}.`);
            }, []);

            return [
                ...errors,
                ...additionalErrors
            ];
        }, []);

        if (validationErrors.length === 0) {
            return null;
        }

        return validationErrors;
    }
}
