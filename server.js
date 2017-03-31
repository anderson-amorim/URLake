var http = require('http');
var app = require('./config/express');
var server = http.createServer(app);

///////////////////////////////////////////////////////////////////////
// Node server configuation
///////////////////////////////////////////////////////////////////////
NODE_PORT = 3005
if (process.env.NODE_PORT) {
    NODE_PORT = process.env.NODE_PORT;
}

///////////////////////////////////////////////////////////////////////
// mongodb access configuation
///////////////////////////////////////////////////////////////////////
var MONGO_URL = '';
if (process.env.MONGODB_HOST && process.env.MONGODB_PORT) {
    MONGO_URL = 'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/urlake'
}

require('./config/database')(MONGO_URL);

server.listen(NODE_PORT, function() {
    console.log('Server started and listening on port ' + NODE_PORT);
});