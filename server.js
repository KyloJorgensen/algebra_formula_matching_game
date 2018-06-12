'use strict';

var express = require('express'),
	app = express(),
	path = require('path'),
	http = require('http');

app.use('/', express.static(path.join(__dirname, './dist/')))
http.createServer(app).listen(8081, function () {
	console.log("Listening on port " + 8081);
});

exports.app = app;


	
