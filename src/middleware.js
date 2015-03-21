'use strict';

// dependencies
var env = require('./middleware/env.js'),
    resolve = require('./middleware/resolver.js'),
    base = require('./middleware/base.js');

module.exports = function(app){

  // set req.env for environment
  app.use(env);

  // set up req.base
  app.use(base);

  // set up req.resolvePath
  app.use(resolve);

  // get user if logged in
  // app.use(user);

  // set up global view vars
  app.use(locals);



  function locals(req, res, next) {
    // app.locals.user = req.user;
    // app.locals.loggedIn = (req.user !== undefined);
    app.locals.env = req.env.toLowerCase() || 'int';
    app.locals.baseURL = req.base;
    next();
  }
};
