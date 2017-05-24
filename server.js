var express = require('express');
var app = express();
var events = require('events');
var socketio = require('socket.io');

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.render('home');
});
app.get('/(:id)', function(req, res) {
  
  res.render('pad');
});

// get sharejs dependencies
var sharejs = require('share');
require('redis');

// options for sharejs 
var options = {	
  db: {type: 'redis'},
};

// attach the express server to sharejs
sharejs.server.attach(app, options);

// listen on port 8000 (for localhost)
var port = process.env.PORT || 8000;
var server = app.listen(port);


var io = socketio.listen(server);

io.sockets.on('connection',function(socket){
	var room_id;

	socket.on('join',function(data){
		room_id = data;
		socket.join(room_id);
		console.log('JOIN ROOM LIST', io.sockets.adapter.rooms);
	})

	socket.on('ping',function(data){
		io.sockets.in(room_id).emit('ping',data);
	})
})