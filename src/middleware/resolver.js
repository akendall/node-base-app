/**
 * Description:
 * Resolve path to where current app is mounted.
 * req.base() uses the ha-proxy headers that tell
 * the app where it is should display (fs.org, etc, instead of herokuapp)
 */

/**
 * Module dependencies
 */
var debug = require("debug")
  , url = require("url");

module.exports =function resolver(req, res, next) {
    req.resolvePath = function(dest) {

      debug(req.base + " -> " + dest);

      // If it has a proto just return the path
      if(dest.match(/^http/)) return dest;

      // Concatenate the paths
      var href = req.base + dest;
      debug(href);
      return href;
    };

  next();
};
