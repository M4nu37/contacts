const express = require('express');
const exp = express();
const app = require('./app');

exp.use(express.static(__dirname + '/source'));

// Create the server
const server = exp.listen(8080, () => {
    exp.use(app);
    const port = server.address().port;
    console.log('Server running on port: ', port);
});