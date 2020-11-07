"use strict";

const {Rule} = require("../Rule.js");

class SameRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "same", translations});
    }

    validate() {
        const {attributes, attributeName, ruleValue} = this;
        const attributeValue = attributes[attributeName];
        const sameValue = attributes[ruleValue];

        if ("undefined" !== typeof attributeValue && null !== attributeValue && attributeValue !== sameValue) {
            this.error = `${attributeName} should be equal to ${ruleValue}.`;
        }
    }
}

exports.SameRule = SameRule;
