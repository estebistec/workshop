var assert = require('assert');
var circle = require('./circle');

assert.equal(circle.area(2), Math.PI * 2 * 2, 'Area for circle of radius 2 failed');
assert.fail('blah!');
