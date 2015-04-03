'use strict';

/*
** deps
*/
// var c = require('../lib/myapp');

var angularRoutes = [
  '/portfolio',
  '/journal',
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
