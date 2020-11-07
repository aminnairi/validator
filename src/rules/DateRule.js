"use strict";

const {Rule} = require("../Rule.js");

class DateRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "date", translations});
    }

    validate() {
        const {attributes, attributeName} = this;
        const attributeValue = attributes[attributeName];

        if ("undefined" !== typeof attributeValue && null !== attributeValue && Number.isNaN(Date.parse(attributeValue))) {
            this.error = `${attributeName} should be a valid date.`;
        }
    }
}

exports.DateRule = DateRule;
