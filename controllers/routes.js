'use strict';

/*
** deps
*/
// var c = require('../lib/casAdmin');

var angularRoutes = [
  '/portfolio',
  '/about',
  '/interests',
  '/projects',
];


module.exports = function(app) {
  angularRoutes.forEach(function(r) {
    app.get(r, function(req, res, next) {
      res.render('index');
    });
  });

  app.get('/', function(req, res, next) {
    res.redirect('/portfolio');
  });

};
