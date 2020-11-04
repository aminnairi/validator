"use strict";

module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        jest: true,
        node: true
    },
    extends: "@aminnairi",
    overrides: [
        {
            env: {
                commonjs: false
            },
            files: ["rollup.config.js"],
            parserOptions: {
                sourceType: "module"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 12
    }
};
