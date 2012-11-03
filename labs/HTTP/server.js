var fs = require('fs'),
    http = require('http');

function logRequest(request, response) {
  // TODO also log extra response info (e.g., 302's location)
  console.log(request.method + " " + request.url + " HTTP/" + request.httpVersion +
      " => " + response.statusCode);

  if(process.env.NODE_ENV == "DEVELOPMENT") {
    for(headerName in request.headers) {
      console.log("\t" + headerName + ": " + request.headers[headerName]);
    }
  }
}

var server = http.createServer(function(request, response) {
    response.statusCode = 200;

    fs.readFile('index.html', function(err, data) {
      if (!err) {
        response.write(data);
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
