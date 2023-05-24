const http = require('http');

const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello, World!');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// This is a simple password
// 37dff909dcfc37e075a338aafc462711