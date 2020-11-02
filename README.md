# validator

JavaScript library to validate an object of values based on a set of given rules.

## Requirements

- [Git](https://git-scm.com/)
- [NPM](https://www.npmjs.com/)

## Installation

```console
$ npm install aminnairi/validator
```

## Uninstallation

```console
$ npm uninstall @aminnairi/validator
```

## Usage

```javascript
const validator = new Validator({
    email: "required|email",
    password: "required|password",
    confirmation: "required|same:password"
});

const data = {
    email: "email@adress",
    password: "abcABC123!@#",
    confirmation: "abcABC!@#123'
};

const errors = validator.validate(data);

console.log(errors);
// [ "email should be a valid email.", "confirmation should be the same as password." ]
```
