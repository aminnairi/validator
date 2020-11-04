import remove from "rollup-plugin-delete";
import {terser} from "rollup-plugin-terser";

export default {
    input: "src/validator.js",

    output: {
        exports: "named",
        file: "dist/validator.js",
        format: "cjs"
    },

    plugins: [
        remove({targets: "dist/*"}),
        terser()
    ]
};
