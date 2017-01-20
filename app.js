var Server = require('./src/back/src/server').Server;
var routing = require('./src/back/config/routing');

var server = Server.getInstance();
server.init();
server.map(routing);
server.run();
