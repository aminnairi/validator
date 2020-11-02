import {terser} from "rollup-plugin-terser";

export default {
    input: "src/request-validator.js",

    plugins: [
        terser()
    ],

    output: {
        file: "dist/request-validator.js",
        format: "cjs",
        exports: "named"
    }
}
