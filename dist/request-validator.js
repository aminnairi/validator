"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.Validator=class{constructor(e){this.rules=e}validate(e){const t=Object.entries(this.rules).reduce(((t,[r,s])=>{const i=s.split("|").map((e=>e.trim())),a=e[r];return[...t,...i.reduce(((t,s)=>{if("required"===s)return void 0===a?[...t,`The ${r} is required.`]:t;if("email"===s){const e=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return"string"==typeof a&&e.test(a)?t:[...t,`The ${r} should be a valid email.`]}if("password"===s){const e=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;return"string"==typeof a&&e.test(a)?t:[...t,`The ${r} should contain at least digits, lower & upper letters, symbols and at least 8 characters.`]}if(s.startsWith("same")){const[,i]=s.split(":"),n=i||"";return e[n]!==a?[...t,`The ${r} is not the same as the ${n}`]:t}throw new Error(`Unrecognized rule: ${s}.`)}),[])]}),[]);return 0===t.length?null:t}};