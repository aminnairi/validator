"use strict";

const {Rule} = require("../Rule.js");

class DifferentRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "different", translations});
    }

    validate() {
        const {attributes, attributeName, ruleValue} = this;
        const attributeValue = attributes[attributeName];
        const differentValue = attributes[ruleValue];

        if ("undefined" !== typeof attributeValue && null !== attributeValue && attributeValue === differentValue) {
            this.error = `${attributeName} should not be equal to ${ruleValue}.`;
        }
    }
}

exports.DifferentRule = DifferentRule;
