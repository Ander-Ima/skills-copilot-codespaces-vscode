// Create a web server that can respond to requests for comments
// to a particular post. The URL will look like
// /comments/<postid>.json
// The response should be an array of comments, as JSON.
// Add a route handler for GET requests to /comments/<postid>.json
// that returns the list of comments as JSON, as described above.
// If a post has no comments, return the JSON text [] (an empty list).
// If there is no such post, return a 404 error.

const http = require('http');
const url = require('url');
const qs = require('querystring');

const comments = {
  1: [
    { id: 1, author: 'Newton', text: 'If I have seen further it is by standing on the shoulders of giants' },
  ],
  2: [
    { id: 2, author: 'Crockford', text: 'JavaScript is the world\'s most misunderstood programming language' },
    { id: 3, author: 'Martin', text: 'Any application that can be written in JavaScript, will eventually be written in JavaScript' },
  ],
};

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const id = pathname.slice(1);
  const data = qs.parse(query);
  if (req.method === 'GET' && pathname === '/echo') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data.message);
  } else if (req.method === 'GET' && pathname === '/comments') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (req.method === 'GET' && pathname === `/comments/${id}`) {
    if (comments[id]) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments[id]));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No such post' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'No such page' }));
  }
});

server.listen(3000);