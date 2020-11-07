"use strict";

class Rule {
    constructor({attributeName, attributes, ruleName, translations}) {
        this.attributeName = attributeName;
        this.attributeVale = attributes[attributeName];
        this.attributes = attributes;
        this.translations = translations;
        this.ruleName = ruleName.trim();
        this.ruleValue = null;
        this.error = null;
    }

    match(rule) {
        const [ruleName, ruleValue] = rule.split(":");

        if (this.ruleName === ruleName) {
            if ("undefined" !== typeof ruleValue) {
                this.ruleValue = ruleValue.trim();
            }

            return true;
        }

        return false;
    }

    hasError() {
        this.validate();

        return null !== this.error;
    }

    getError() {
        const {error, translations, attributeName, ruleName} = this;

        if (null !== error && "undefined" !== typeof translations[this.attributeName] && "undefined" !== typeof translations[attributeName][ruleName]) {
            return translations[attributeName][ruleName];
        }

        return error;
    }
}

exports.Rule = Rule;
