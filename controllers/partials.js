/**
 * Module dependencies
 */
// var m = require("../lib/middleware");

/**
 * Expose the api routes
 */
module.exports = function(app) {

  app.get('/partials/:name', function(req, res, next) {
    var name = req.params.name;
    res.render('partials/' + name,{layout:false});
  });
  app.get('/partials/:folder/:name', function(req, res, next) {
    req.accepts('text/html');
    var name = req.params.name.split('.')[0],
        folder = req.params.folder;



    res.render('partials/' + folder +'/'+ name,{layout:false});
  });
};
