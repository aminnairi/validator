import {terser} from "rollup-plugin-terser";
import remove from "rollup-plugin-delete";

export default {
    input: "src/validator.js",

    plugins: [
        remove({targets: "dist/*"}),
        terser()
    ],

    output: {
        file: "dist/validator.js",
        format: "cjs",
        exports: "named"
    }
}
