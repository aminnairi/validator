"use strict";

const {Rule} = require("../Rule.js");

class PasswordRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "password", translations});
    }

    validate() {
        const {attributes, attributeName} = this;
        const attributeValue = attributes[attributeName];

        const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/u;

        if ("string" === typeof attributeValue && !pattern.test(attributeValue)) {
            this.error = `${attributeName} should contain at least digits, lower & upper letters, symbols and at least 8 characters.`;
        }
    }
}

exports.PasswordRule = PasswordRule;
