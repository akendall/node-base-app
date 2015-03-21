var clc = require('cli-color'),
    debug = require('debug')('services:request');


exports.get = function(agent, metric, serviceName, uri, sessionId, queries, headers, done) {
  headers = (headers && typeof headers === 'object') ? headers : {};
  queries = (queries && typeof queries === 'object') ? queries : {};

  agent
    .get(uri)
    .query({sessionId: sessionId})
    .query(queries)
    .set({authorization: 'Bearer '+sessionId})
    .set({accept: "application/json"})
    .set({encoding: "UTF-8"})
    .set(headers)
    .end(function(err, response) {
      if(err){
        var responseBody = (response) ? response.body : null;
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        debug(clc.cyanBright.bold('err: ',JSON.stringify(err)));
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.err', 1, {method: clc.red.bold('GET'), status: clc.red.bold(err.code), url: (response && response.req) ? response.req._headers.host+response.req.path : uri}); }
        return done(err, responseBody, response);
      }
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      debug(clc.cyanBright.bold('serviceName: ',serviceName));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('uri: ', response.req._headers.host+response.req.path));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('response.body: ',JSON.stringify(response.body)));
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      if(response.ok){
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.ok', 1, {method: clc.green.bold('GET'), status: clc.green.bold(response.status), url: response.req._headers.host+response.req.path}); }
        done(null, response.body, response);
      } else{
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.bad', 1, {method: clc.yellow.bold('GET'), status: clc.yellow.bold(response.status), url: response.req._headers.host+response.req.path, body: response.body}); }
        done({code: response.statusCode, message: response.body}, response.body, response);
      }
    });
};



exports.post = function(agent, metric, serviceName, uri, sessionId, formData, queries, headers, done) {
  headers = (headers && typeof headers === 'object') ? headers : {};
  queries = (queries && typeof queries === 'object') ? queries : {};

  agent
    .post( uri )
    .query({sessionId: sessionId})
    .query(queries)
    .set({accept: "application/json"})
    .set({authorization: 'Bearer '+sessionId})
    .set({'content-type': "application/json"})
    .set(headers)
    .setLocale()
    .send(formData)
    .end(function(err, response) {
      if(err){
        var responseBody = (response) ? response.body : null;
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        debug(clc.cyanBright.bold('err: ',JSON.stringify(err)));
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.err', 1, {method: clc.red.bold('POST'), status: clc.red.bold(err.code), url: (response && response.req) ? response.req._headers.host+response.req.path : uri}); }
        return done(err, responseBody, response);
      }
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      debug(clc.cyanBright.bold('serviceName: ',serviceName));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('uri: ', response.req._headers.host+response.req.path));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('formData: ',JSON.stringify(formData)));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('response.body: ',JSON.stringify(response.body)));
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      if(response.ok){
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.ok', 1, {method: clc.green.bold('POST'), status: clc.green.bold(response.status), url: response.req._headers.host+response.req.path}); }
        done(null, response.body, response);
      } else {
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.bad', 1, {method: clc.yellow.bold('POST'), status: clc.yellow.bold(response.status), url: response.req._headers.host+response.req.path, body: response.body}); }
        done({code: response.statusCode, message: response.body}, response.body, response);
      }

    });
};


exports.del = function(agent, metric, serviceName, uri, sessionId, queries, headers, done) {
  headers = (headers && typeof headers === 'object') ? headers : {};
  queries = (queries && typeof queries === 'object') ? queries : {};

  agent
    .del(uri)
    .query({sessionId: sessionId})
    .query(queries)
    .set(headers)
    .set({authorization: 'Bearer '+sessionId})
    .set({accept: "application/json"})
    .set({encoding: "UTF-8"})
    .end(function(err, response) {
      if(err){
        var responseBody = (response) ? response.body : null;
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        debug(clc.cyanBright.bold('err: ',JSON.stringify(err)));
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.err', 1, {method: clc.red.bold('DELETE'), status: clc.red.bold(err.code), url: (response && response.req) ? response.req._headers.host+response.req.path : uri}); }
        return done(err, responseBody, response);
      }
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      debug(clc.cyanBright.bold('serviceName: ',serviceName));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('uri: ', response.req._headers.host+response.req.path));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('response.body: ',JSON.stringify(response.body)));
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      if(response.ok){
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.ok', 1, {method: clc.green.bold('DELETE'), status: clc.green.bold(response.status), url: response.req._headers.host+response.req.path}); }
        done(null, response.body, response);
      } else{
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.bad', 1, {method: clc.yellow.bold('DELETE'), status: clc.yellow.bold(response.status), url: response.req._headers.host+response.req.path, body: response.body}); }
        done({code: response.statusCode, message: response.body}, response.body, response);
      }
    });
};

exports.put = function(agent, metric, serviceName, uri, sessionId, queries, headers, done) {
  headers = (headers && typeof headers === 'object') ? headers : {};
  queries = (queries && typeof queries === 'object') ? queries : {};

  agent
    .put(uri)
    .query({sessionId: sessionId})
    .query(queries)
    .set(headers)
    .set({authorization: 'Bearer '+sessionId})
    .set({accept: "application/json"})
    .setLocale()
    .set({encoding: "UTF-8"})
    .end(function(err, response) {
      if(err){
        var responseBody = (response) ? response.body : null;
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        debug(clc.cyanBright.bold('err: ',JSON.stringify(err)));
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.err', 1, {method: clc.red.bold('PUT'), status: clc.red.bold(err.code), url: (response && response.req) ? response.req._headers.host+response.req.path : uri}); }
        return done(err, responseBody, response);
      }
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      debug(clc.cyanBright.bold('serviceName: ',serviceName));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('uri: ', response.req._headers.host+response.req.path));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('response.body: ',JSON.stringify(response.body)));
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      if(response.ok){
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.ok', 1, {method: clc.green.bold('PUT'), status: clc.green.bold(response.status), url: response.req._headers.host+response.req.path}); }
        done(null, response.body, response);
      } else{
        if(metric && metric.count){ metric.count('registration.api.'+serviceName+'.bad', 1, {method: clc.yellow.bold('PUT'), status: clc.yellow.bold(response.status), url: response.req._headers.host+response.req.path, body: response.body}); }
        done({code: response.statusCode, message: response.body}, response.body, response);
      }
    });
};
