## guardianjs

guardianjs is an unopinionated JavaScript testing micro-framework.  There is no configuration necessary.  There are no wierd conventions.  Just require and add tests.

![](http://cdn.meme.am/instances/54336539.jpg)

## Install

```bash
$ npm install guardianjs
```

## Usage

Ask guardian for a guard to keep watch over your code.  Tell them what things they need to assure remain truthy.  Ask them at any time for a full report.

```js
var guardian = require('guardianjs');

var guard = guardian();

guard.assure(true);
guard.assure(false);

console.log(guard.report()); 
// console output: { pass: 1, fail: 1, notes: [] }
```

Or give a duty to be performed in the event of failure.  Anything returned is added to the notes of their report.  This would be a great place to call console's error method.

```js
var guardian = require('guardianjs');

var guard = guardian().duty(function(data) {
	console.error(new Error('Fail!'));
	return data.join(' ');
});

guard.assure(true);
guard.assure(false, 'how could false fail!?', 5);

console.log(guard.report()); 
// console output: { pass: 1, fail: 1, notes: ['how could false fail!? 5'] }
```