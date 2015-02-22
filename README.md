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
var guardian = require('guardianjs');

var guard = guardian();

guard.assert(true);
guard.assert(false);

console.log(guard.report()); 
// console output: { pass: 1, fail: 1 }

console.log(guard.failures()); 
// console output: [{pass: false}] /* not super helpful yet */
```

## Extend

It is really simple to extend guardian.  In fact the failure output is not as interesting until you do.  For example: 

```js
var guardian = require('guardianjs'),
	Guard = guardian.Guard;

Guard.prototype.test = function(name) {
	this.name = name;
	return this;
}

var guard = guardian();

guard.test("I'm a test").assert(false).assert(false);

console.log(guard.failures()); 
// console output: [{pass: false, name: "I'm a test"}, {pass: false, name: "I'm a test"}]
```
## Built-In Extensions

### Tap Tests

```js
var guardian = require('guardianjs'),
guardian.Guard = guardian.Tap;

// default logging is: guardian.Tap.log = console.log; 

var tap = guardian();

tap.start(); // console.log('TAP version 13');

tap.test("passing", true);  // console.log('ok 1 - passing')
tap.test("failing", false); // console.log('not ok 2 - failing')

tap.end(); // console.log('1..2');
```
