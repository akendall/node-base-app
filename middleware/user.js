'use strict';
/**
 * Description:
 * sessionCheck() fetches the user data from CIS (1st time) based on sessionId. User data is then cached in redis.
 * Successive fetches for user data will hit the redis store instead of CIS. Each app (instance of woodruff) spins
 * up its own redis instance.
 */

/**
 * Module dependencies
 */
var debug = require("debug")("woodruff:middleware:session"),
    env = require("envs"),
    superagent = require("superagent"),
    url = require("url");

/**
 * Defines
 */
var MAX_RETRIES = env("CIS_MAX_RETRIES", 1),
    CIS_TIMEOUT = env("CIS_TIMEOUT", 10000);


module.exports = function(req, res, next) {

  // Check to see if they even have a cookie
  var sessionId = req.cookies.fssessionid,
      refreshtoken = req.cookies.refreshtoken,
      environment = req.env || 'INT',
      CIS_URL = env(environment+"_CIS_BASE_URL", "https://identint.familysearch.org")+'/cis-public-api/v4/user';

  // If they don't have one move along
  if(!sessionId) return next();

  // Call cis
  cis(sessionId, refreshtoken, CIS_URL, function(err, user, tries, code, isRedis) {

    // We probably couldn't connect or timed out
    if(err) return next(err);

    // We got a valid user
    if(user) {
      debug("successful login", user);
      req.user = user;
    }

    // Invalid session
    if(code === 453) {
      debug('clearing fssessionid cookie: ' + sessionId);

      var base = url.parse(req.base)
        , host = ~base.host.indexOf('familysearch.org') ? '.familysearch.org' : '';

      var cookieOptions = {
        secure: (base.protocol === "https:"),
        path: '/',
        domain: host
      };

      res.clearCookie('fssessionid', cookieOptions);
      res.clearCookie('refreshtoken', cookieOptions);

      delete req.cookies.fssessionid;
      delete req.cookies.refreshtoken;
    }


    next();
  });
};

/**
 * Perform cis request
 *
 * @api private
 */
function cis (sessionId, refreshtoken, URL, done) {
  var key = "ident:" + sessionId;

  requestProfile(sessionId, refreshtoken, URL, 0, function(err, profile, tries, code) {
    if(err || (!profile && code !== 404)) return done.apply(null, arguments);

    var profileData = code === 404
        ? "a" // anonymous session
        : JSON.stringify(profile);

    done(null, profile, tries, code);

  });
}

function requestProfile(sessionId, refreshtoken, URL, tries, done) {
  // Don't exceed the MAX_RETRIES
  if(tries > MAX_RETRIES) {
    var err = new Error("CIS Timeout after " + tries + " tries");
    err.timeout = true;
    err.code = 502;
    return done(err, null, tries, 502);
  }

  // Increment the number of tries
  tries++;
  debug("tries " + tries);

  // Make the request
  var req = superagent
    .get(URL)
    .query({sessionId: sessionId})
    .set({accept: "application/json"})
    .timeout(CIS_TIMEOUT);

  // Handle errors
  req.on("error", function(err) {

    // We've timed out; retry the call
    debug("error=" + err, "sessionId=" + sessionId);
    if(err.timeout) return cis(sessionId, refreshtoken, done, tries);

    // Probably couldn't connect
    done(err, null, tries, 500);
  });

  req.end(function(err, response) {
    // Handle a successful session
    debug("Response",response);

    if(response.ok) {
      var user = {
        profile: response.body.users[0],
        loggedIn: true,
        sessionId: sessionId
      };

      return done(null, user, tries, response.status);
    }

    // Invalid session
    if(response.status === 453) {
      // TODO handle the refresh token here

      return done(null, null, tries, response.status);
    }

    // We don't know how to handle the response
    done(null, null, tries, response.status);
  });
}
