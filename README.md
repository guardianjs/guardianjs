## guardianjs

guardianjs is an unopinionated JavaScript testing micro-framework.  There is no configuration necessary.  There are no wierd conventions.  Just require and add tests.

![](http://cdn.meme.am/instances/54336539.jpg)

## Install

```bash
$ npm install guardianjs
```

## Usage

```js
var guardian = require('guardianjs');

var guard = guardian();

guard.assure(true);
guard.assure(false);

console.log(guard.report()); 
// console output: { pass: 1, fail: 1, notes: [] }
```

Or give a duty to be performed in the event of failure.  Anything returned is added to the notes.

```js
var guardian = require('guardianjs');

var guard = guardian().duty(function(data) {
	return data.join(' ');
});

guard.assure(true);
guard.assure(false, 'how could false fail!?', 5);

console.log(guard.report()); 
// console output: { pass: 1, fail: 1, notes: ['how could false fail!? 5'] }
```