var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    SocketService = require('./app/services/SocketService'),
    methodOverride = require('method-override');

// config files
var db = require('./config/db');

var port = process.env.PORT || 8080;
mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

SocketService.Init(io);
io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(port, function () {
    console.log('Magic happens on port ' + port);
});
exports = module.exports = app;
