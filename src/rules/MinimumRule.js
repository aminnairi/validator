"use strict";

const {Rule} = require("../Rule.js");

class MinimumRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "minimum", translations});
    }

    validate() {
        const {attributes, attributeName, ruleValue} = this;
        const attributeValue = attributes[attributeName];
        const minimumValue = Number(ruleValue);

        if ("undefined" !== typeof attributeValue && null !== attributeValue && !Number.isNaN(minimumValue)) {
            if ("string" === typeof attributeValue && attributeValue.length < minimumValue) {
                this.error = `${attributeName} should have at least ${minimumValue} characters.`;
            } else if ("number" === typeof attributeValue && attributeValue < minimumValue) {
                this.error = `${attributeName} should be at least equal to ${ruleValue}.`;
            }
        }
    }
}

exports.MinimumRule = MinimumRule;
