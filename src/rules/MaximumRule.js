"use strict";

const {Rule} = require("../Rule.js");

class MaximumRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "maximum", translations});
    }

    validate() {
        const {attributes, attributeName, ruleValue} = this;
        const attributeValue = attributes[attributeName];
        const maximumValue = Number(ruleValue);

        if ("undefined" !== typeof attributeValue && null !== attributeValue && !Number.isNaN(maximumValue)) {
            if ("string" === typeof attributeValue && attributeValue.length > maximumValue) {
                this.error = `${attributeName} should have at most ${maximumValue} characters.`;
                return;
            }

            if ("number" === typeof attributeValue && attributeValue > maximumValue) {
                this.error = `${attributeName} should be at most equal to ${ruleValue}.`;
            }
        }
    }
}

exports.MaximumRule = MaximumRule;
