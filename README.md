## guardianjs

guardianjs is an unopinionated JavaScript testing micro-framework.  There is no configuration necessary.  There are no weird conventions.  Just require and add tests.

![](http://cdn.meme.am/instances/54336539.jpg)

## Install

```bash
$ npm install guardianjs
```

## Usage

Ask guardian for a guard to keep watch over your code.  Tell them what things they need to assert are truthy.  Ask them at any time for a full report.  If there are any failures you can ask for more specifics.

```js
var guardian = require('guardianjs'),
    guard = guardian();

guard.assert(true);
guard.assert(false);

console.log(guard.report()); 
// console output: { pass: 1, fail: 1 }
```

## Watch

Want your tests to run automatically when files get updated?

Try https://github.com/guardianjs/guardian-runner

## Extend

It is really simple to extend guardian.  Properties added before calling assert are saved as metadata available when viewing failures.  For example: 

```js
var guardian = require('guardianjs'),
    guard = guardian();

var test = Object.create(guard);
test.name = "I'm a test";

test.assert(false).assert(false);

console.log(guard.failures()); 
// console output: [{pass: false, name: "I'm a test"}, {pass: false, name: "I'm a test"}]
```
## Built-In Extensions

### Tap Tests

coming...
