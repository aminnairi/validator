# validator

![Tests](https://github.com/aminnairi/validator/workflows/Tests/badge.svg?branch=latest) ![Code Style](https://github.com/aminnairi/validator/workflows/Code%20Style/badge.svg?branch=latest)

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

## Example

### Validation

```javascript
"use strict";

const {Validator} = require("@aminnairi/validator");

const rules = {
    confirmation: "required|string|same:password",
    email: "required|string|email",
    password: "required|string|password"
};

const validator = new Validator(rules);

const data = {
    confirmation: "abcABC123!@#",
    email: "email@address.com",
    password: "abcABC123!@#"
};

const errors = validator.validate(data);
```

### Translation

```console
"use strict";

const {Validator} = require("./src/validator.js");

const rules = {
    confirmation: "required|string|same:password",
    email: "required|string|email",
    password: "required|string|password"
};

const translations = {
    confirmation: {
        required: "Le mot de passe de confirmation est obligatoire.",
        same: "Les mots de passes ne correspondent pas.",
        string: "Le mot de passe de confirmation doit être au format texte."
    },

    email: {
        email: "L'adresse email doit avoir un format valide.",
        required: "L'adresse email est obligatoire.",
        string: "L'adresse email doit être au format texte."
    },

    password: {
        password: "Le mot de passe doit comporter au moins une lettre (majuscule, minuscule), un chiffre, un symbole et 8 caractères.",
        required: "Le mot de passe est obligatoire.",
        string: "Le mot de passe doit être au format texte."
    }
};

const data = {email: "email@domain"};

const errors = new Validator(rules, translations).validate(data);
```

## API

### Methods

#### Constructor

##### Prototype

```javascript
new(rules: Record<string, string>): Validator;
```

##### Example

```javascript
const validator = new Validator({
    confirmation: "required|string|same:password",
    email: "required|string|email",
    password: "required|string|password"
});
```

#### Validate

##### Prototype

```javascript
validate(data: Record<string, any>): Record<string, Array<string>> | null;
```

##### Example

```javascript
const noErrors = validator.validate({
    confirmation: "abcABC123!@#",
    email: "email@domain.com",
    password: "abcABC123!@#"
});

console.log(noErrors); // null

const errors = validator.validate({
    email: "email@domain",
    password: "abcABC123!@#"
});

console.log(errors); // {email: ["email should be a valid email."], confirmation: ["confirmation should be the same as password."]}
```

### Rules

#### Required

Check if the said attribute is present in the provided data.

```javascript
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
const validator = new Validator({
    password: "required|password",
    confirmation: "same:password"
});

const badData   = {password: "abcABC123!@#", confirmation: "abcABC123"};
const goodData  = {password: "abcABC123!@#", confirmation: "abcABC123!@#"};

validator.validate(badData);    // {confirmation: ["confirmation should be the same as password."]}
validator.validate(goodData);   // null
```

#### Different

```javascript
const validator = new Validator({
    password: "different:username",
    username: "required"
});

const badData   = {password: "johndoe", username: "johndoe"};
const goodData  = {password: "abcABC123!@#", username: "johndoe"};

validator.validate(badData);    // {password: ["password should be different than username."]}
validator.validate(goodData);   // null
```

#### Minimum

Check if the said attribute is at least equals to a given one.

```javascript
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
const validator = new Validator({
    status: "integer"
});

const badData   = {status: "ACTIVE"};
const goodData  = {status: 12};

validator.validate(badData);    // {status: ["status should be an integer."]}
validator.validate(goodData);   // null
```

#### Date

Check if the said attribute is a date.

```javascript
const validator = new Validator({
    birthday: "date"
});

const badData   = {birthday: "tomorrow"};
const goodData  = {birthday: new Date().toString()};

validator.validate(badData);    // {birthday: ["birthday should be a valid date."]}
validator.validate(goodData);   // null
```

#### String

Check if the said attribute is a string.

```javascript
const validator = new Validator({
    name: "string"
});

const badData   = {name: 42};
const goodData  = {name: "John DOE"};

validator.validate(badData);    // {name: ["name should be a string."]}
validator.validate(goodData);   // null
```
