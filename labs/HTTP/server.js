var fs = require('fs'),
    http = require('http');

var templateEngine = function(template, data) {
  var vars = template.match(/\{\w+\}/g);

  if(vars === null) {
    return template;
  }

  var nonVars = template.split(/\{\w+\}/g);
  var output = '';

  for(var i = 0; i < nonVars.length; i++) {
    output += nonVars[i];

    if(i < vars.length) {
      var key = vars[i].replace(/[\{\}]/g, '');
      output += data[key];
    }
  }

  return output;
};

var logRequest = function(request, response) {
  // TODO also log extra response info (e.g., 302's location)
  console.log(request.method + " " + request.url + " HTTP/" + request.httpVersion +
      " => " + response.statusCode);

  if(process.env.NODE_ENV == "DEVELOPMENT") {
    for(headerName in request.headers) {
      console.log("\t" + headerName + ": " + request.headers[headerName]);
    }
  }
};

var server = http.createServer(function(request, response) {
    response.statusCode = 200;

    fs.readFile('index.html', function(err, fileData) {
      if (!err) {
        response.write(templateEngine(fileData.toString(), {
          name: 'Ryan Dahl',
          node: process.versions.node,
          v8: process.versions.v8,
          time: new Date(),
          url: request.url
        }));
        response.end();
      }
      else {
        response.write("Could not load file!");
        response.end();
      }
    });
    logRequest(request, response);
});

server.listen(2000);
console.log('Server running at http://localhost:2000');
