
var planets = require('./planets.json');
var circle = require('./circle');
var radius = planets.earth;
console.log( 'The area of the planet earth is ' + circle.area(radius) + ' km2');
