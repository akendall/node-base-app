'use strict';

module.exports = function(req, res, next) {

  var envCookie = req.cookies.env;

  if(envCookie === 'PROD'){
    req.env = 'PROD';
  } else if(envCookie === 'BETA') {
    req.env = 'BETA';
  } else {
    req.env = 'INT';
  }

  next();
};
