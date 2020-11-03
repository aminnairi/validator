# validator

![Tests](https://github.com/aminnairi/validator/workflows/Tests/badge.svg?branch=latest)

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
const {Validator} = require("@aminnairi/validator");

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
```

## API

### Rules

#### Required

Check if the said attribute is present in the provided data.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    username: "required",
    age: "required",
    status: "required"
});

const badData   = {age: undefined, status: null};
const goodData  = {username: "username", age: 18, status: "ACTIVE"};

validator.validate(badData);    // {username: ["username is required"], age: ["age is required."], status: ["status is required"]}
validator.validate(goodData);   // null
```

#### Email

Check if the said attribute is a valid email.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    user: "email"
});

const badData   = {user: "user@domain"};
const goodData  = {user: "user@domain.com"};

validator.validate(badData);    // {email: ["user should be a valid email."]}
validator.validate(goodData);   // null
```

#### Password

Check if the said attribute contains at least one digit, one lower case letter, one upper case letter, one symbol and is at least eight characters long.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    password: "password"
});

const badData   = {password: "abcABC123"};
const goodData  = {password: "abcABC123!@#"};

validator.validate(badData);    // {password: ["password should contain at least digits, lower & upper letters, symbols and at least 8 characters."]}
validator.validate(goodData);   // null
```

#### Same

Check if the said attribute is the same as another one.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    password: "required|password",
    confirmation: "same:password"
});

const badData   = {password: "abcABC123!@#", confirmation: "abcABC123"};
const goodData  = {password: "abcABC123!@#", confirmation: "abcABC123!@#"};

validator.validate(badData);    // {confirmation: ["confirmation should be the same as password."]}
validator.validate(goodData);   // null
```

#### Minimum

Check if the said attribute is at least equals to a given one.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    age: "minimum:18",
    name: "minimum:3"
});

const badData   = {age: 16, name: "ab"};
const goodData  = {age: 18, name: "John"};

validator.validate(badData);    // {age: ["age should be at least equal to 18."], name: ["name should have at least 3 characters."]}
validator.validate(goodData);   // null
```

#### Maximum

Check if the said attribute is at most equals to a given one.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    age: "maximum:99",
    name: "maximum:3"
});

const badData   = {age: 100, name: "John"};
const goodData  = {age: 99, name: "Joe"};

validator.validate(badData);    // {age: ["age should be at most equal to 99."], name: ["name should have at most 3 characters."]}
validator.validate(goodData);   // null
```

#### In

Check if the said attribute is includes inside a set of given values.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    role: "in:ADMIN,USER,SUPERUSER"
});

const badData   = {role: "MODERATOR"};
const goodData  = {role: "USER"};

validator.validate(badData);    // {role: ["role should be one of the following: ADMIN, USER, SUPERUSER."]}
validator.validate(goodData);   // null
```

#### Integer

Check if the said attribute is an integer.

```javascript
const {Validator} = require("@aminnairi/validator");

const validator = new Validator({
    status: "integer"
});

const badData   = {status: "ACTIVE"};
const goodData  = {status: 12};

validator.validate(badData);    // {status: ["status should be an integer."]}
validator.validate(goodData);   // null
```
