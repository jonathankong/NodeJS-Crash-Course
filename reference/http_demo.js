const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World Hi!!');
  res.end();
}).listen(5000, () => console.log('Server Running...'));