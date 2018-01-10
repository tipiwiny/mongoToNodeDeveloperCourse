const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.use(function(req, res){
    res.sendStatus(404);
});

const server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
