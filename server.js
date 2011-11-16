var http       = require("http"),
    faye       = require("faye"),
    paperboy   = require("paperboy"),
    path       = require("path"),
    fs         = require("fs"),
    builder = require("xmlbuilder"),
    WEBROOT    = path.dirname(__filename),
    bayeux     = new faye.NodeAdapter({mount: "/faye", timeout: 100000});

// Handle non-Bayeux requestsS
var server = http.createServer(function(request, response) {

  var ip = request.connection.remoteAddress;
  paperboy
  .deliver(WEBROOT, request, response)
  .otherwise(function(err) {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end("Error 404: File not found");
  });
});

bayeux.attach(server);

server.listen(8080);
