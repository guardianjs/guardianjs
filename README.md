## guardianjs

guardianjs is an unopinionated JavaScript testing micro-framework.  There is no configuration necessary.  There are no weird conventions.  Just require and add tests.

![](http://cdn.meme.am/instances/54336539.jpg)

## Install

```bash
$ npm install guardianjs
```

## Usage

Ask guardian for a guard to keep watch over your code.  Tell them what things they need to assert remain truthy.  Ask them at any time for a full report.

```js
var guardian = require('guardianjs');

var guard = guardian();

guard.assert(true);
guard.assert(false);

console.log(guard.report()); 
// console output: { pass: 1, fail: 1 }
```
