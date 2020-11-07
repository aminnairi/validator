"use strict";

const {Rule} = require("../Rule.js");

class IntegerRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "integer", translations});
    }

    validate() {
        const {attributes, attributeName} = this;
        const attributeValue = attributes[attributeName];

        if (!Number.isInteger(attributeValue)) {
            this.error = `${attributeName} should be an integer.`;
        }
    }
}

exports.IntegerRule = IntegerRule;
