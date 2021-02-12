const server = require('./api/server.js');

const Port = process.env.PORT || 8005;
server.listen(Port, () => console.log(`Ear hustling on port ${Port} `));