var sortBy = require('underscore').sortBy,
    keys = require('underscore').keys,
    planets = require('./planets.json');

planets = sortBy(keys(planets), function(k) { return planets[k]; })

console.log(planets);
