'use strict';

/**
 * Module dependencies
 */
var env = require("envs"),
    url = require("url");


module.exports = function(req, res, next) {

  req.base = 'http://localhost:5000';

  next();
};
