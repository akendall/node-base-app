#!/usr/bin/env node
'use strict';

// dependencies
var express = require('express'),
    stack = require("./src/stack"),
    controllers = require("./src/controllers"),
    // auth = require("./src/auth"),
    // proxies = require("./src/proxies"),
    error = require("./src/errors"),
    middleware = require("./src/middleware"),
    http = require('http'),
    path = require('path');


var app = module.exports = express();

// set up proxies
// proxies(app);

// set up stack
stack(app);

// set up fs auth
// auth(app);

// set up middleware
middleware(app);

// load routes and controllers
controllers(app);

// set up errors
error(app);


app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/assets'));

app.configure('development', function(){

    // var lr = require('tiny-lr')();
    // lr.listen(35729);

  // app.use(require('connect-livereload')());
});

// create server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
