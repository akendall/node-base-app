'use strict';

// dependencies
var express = require('express');

module.exports = function(app){

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
  });
};
