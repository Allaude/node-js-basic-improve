const http = require('http');
const routing = require('./routing')

const server = http.createServer(routing.handle);
console.log(routing.title);

server.listen(5000);
