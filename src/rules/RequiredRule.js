"use strict";

const {Rule} = require("../Rule.js");

class RequiredRule extends Rule {
    constructor({attributeName, attributes, translations}) {
        super({attributeName, attributes, ruleName: "required", translations});
    }

    validate() {
        const {attributes, attributeName} = this;
        const attributeValue = attributes[attributeName];

        if ("undefined" === typeof attributeValue || null === attributeValue) {
            this.error = `${attributeName} is required.`;
        }
    }
}

exports.RequiredRule = RequiredRule;
