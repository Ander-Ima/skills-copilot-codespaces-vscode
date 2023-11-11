// Create a web server
// [ { "author": "Pete Hunt", "text": "Hey there!" }, { "author": "Paul O’Shannessy", "text": "React is *great*!" } ]
// Use the fs module to read the comments.json file and the JSON.parse method to convert it to an object. 
// Respond to requests with this object as the JSON response.

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(data);
  });
});

server.listen(8080);
console.log('Server listening on port 8080');

// Run the following command in the terminal to start the server: node comments.js
// Open a new tab in your browser and go to http://localhost:8080/comments.json
// You should see the JSON array returned

// Exercise 3
// Path: comments.js
// Modify the server created in the previous exercise to respond to POST requests by writing the body of the request to comments.json.
// Hint: you can get the body of the request with the on('data') and on('end') events.

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      fs.writeFile('comments.json', body, function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Got it");
      });
    });
  } else {
    fs.readFile('comments.json', function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(data);
    });
  }
});

server.listen(8080);
console.log('Server listening on port 8080');