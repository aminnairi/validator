"use strict";

const {Rule} = require("../Rule.js");

class InRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "in", translations});
    }

    validate() {
        const {attributes, attributeName, ruleValue} = this;
        const attributeValue = attributes[attributeName];

        const ruleValues = ruleValue.split(",").map(value => value.trim());

        if ("undefined" !== typeof attributeValue && null !== attributeValue && !ruleValues.includes(attributeValue)) {
            this.error = `${attributeName} should be one of the following: ${ruleValues.join(", ")}.`;
        }
    }
}

exports.InRule = InRule;
