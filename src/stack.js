'use strict';

// dependencies
var express = require('express'),
    expressLayouts = require('express-ejs-layouts'),
    env = require('envs');

module.exports = function(app){

  app.set('port', env('PORT', 5000));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');
  app.set('view options',{layout: 'layout'});

  app.use(express.favicon());
  app.use(expressLayouts);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());


  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(express.cookieParser());
  // app.use(express.session(
  //   {
  //     secret: process.env.SESSION_SECRET,
  //     cookie: {httpOnly: false}
  //   }
  // ));

};
