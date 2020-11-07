# validator

![Tests](https://github.com/aminnairi/validator/workflows/Tests/badge.svg?branch=latest) ![Code Style](https://github.com/aminnairi/validator/workflows/Code%20Style/badge.svg?branch=latest)

JavaScript library to validate an object of values based on a set of given rules.

*:warning: This library is still in its early stage. Usage is permitted but without any guarantees the API will not change in a near future.*

```javascript
"use strict";

const {Validator} = require("@aminnairi/validator");

new Validator({secret: "required|string|password"}).validate({secret: "kitten123"});
```

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

## API

### Constructor

#### Synopsis

Instanciate a new validator.

#### Prototype

```typescript
new: (rules: Record<string, string>) => Validator;
```

### setTranslations

#### Synopsis

Customize the error messages generated by the validator.

#### Prototype

```typescript
setTranslations: (translations: Record<string, Record<string, string>>) => void;
```

### validate

#### Synopsis

Return properties that do not match the rules set for the created validator.

#### Prototype

```typescript
validate: (data: Record<string, any>) => null | Record<string, string[]>;
```

## Rules

### Date

#### Synopsis

Check if the value is a date.

#### Example

See [`example/date.js`](./examples/date.js).

### Different

#### Synopsis

Check if the value is not equal to another.

#### Example

See [`example/different.js`](./examples/different.js).

### Email

#### Synopsis

Check if the value is a valid email.

#### Example

See [`example/email.js`](./examples/email.js).

### In

#### Synopsis

Check if the value is include inside a set of values.

#### Example

See [`example/in.js`](./examples/in.js).

### Integer

#### Synopsis

Check if the value is an integer.

#### Example

See [`example/integer.js`](./examples/integer.js).

### Maximum

#### Synopsis

Check if a number is lower or equal to a given one. This also checks if a string has a length of at most a given length.

#### Example

See [`example/maximum.js`](./examples/maximum.js).

### Minimum

#### Synopsis

Check if a number is greater or equal to given one. This also checks if a string has a length of at least a given length.

#### Example

See [`example/minimum.js`](./examples/minimum.js).

### Password

#### Synopsis

Check if a value has at least one lower and uppercase letter, one digit, one symbol and at least 8 characters.

#### Example

See [`example/password.js`](./examples/password.js).

### Required

#### Synopsis

Check if a value is present and is not null.

#### Example

See [`example/required.js`](./examples/required.js).

### Same

#### Synopsis

Check if a value is equal to another.

#### Example

See [`example/same.js`](./examples/same.js).

### String

#### Synopsis

Check if a value is of type string.

#### Example

See [`example/string.js`](./examples/string.js).
