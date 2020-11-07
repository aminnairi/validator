"use strict";

const {Rule} = require("../Rule.js");

class StringRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "string", translations});
    }

    validate() {
        const {attributes, attributeName} = this;
        const attributeValue = attributes[attributeName];

        if ("string" !== typeof attributeValue) {
            this.error = `${attributeName} should be a string.`;
        }
    }
}

exports.StringRule = StringRule;
