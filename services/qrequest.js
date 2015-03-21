var clc     = require( 'cli-color' ),
    Q = require('q'),
    debug = require( 'debug' )( 'node-js-getting-started:services:qrequest' );


exports.get = function(agent, serviceName, uri, sessionId, queries, headers) {
  var dfd = Q.defer();

  headers = (headers && typeof headers === 'object') ? headers : {};
  queries = (queries && typeof queries === 'object') ? queries : {};

  agent
    .get(uri)
    .query({sessionId: sessionId})
    .query(queries)
    .set({accept: "application/json"})
    .set({encoding: "UTF-8"})
    .set(headers)
    .timeout(30000)
    .end(function(err, response) {

      if(err){
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        debug(clc.cyanBright.bold('err: ',JSON.stringify(err)));
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));


        err.service = serviceName;
        return dfd.reject(err);
      }
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      debug(clc.cyanBright.bold('serviceName: ',serviceName));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('uri: ',uri));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('response.body: ',JSON.stringify(response.body)));
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      if(response.ok){

        dfd.resolve(response.body);
      } else{

        dfd.reject({service: serviceName, code: response.statusCode, message: response.body});
      }
    });

  return dfd.promise;
};


exports.post = function(agent, metric, serviceName, uri, sessionId, formData, dfds) {
  var dfd = Q.defer();

  dfds.push(dfd.promise);
  agent
    .post(uri)
    .query({sessionId: sessionId})
    .set({accept: "application/json"})
    .set({'content-type': "application/json"})
    .set({'authorization': "Bearer "+sessionId})
    .send(formData)
    .timeout(10000)
    .end(function(err, response) {
      if(err){
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
        debug(clc.cyanBright.bold('err: ',JSON.stringify(err)));
        debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));

        return dfd.reject(err);
      }
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      debug(clc.cyanBright.bold('serviceName: ',serviceName));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('uri: ',uri));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('formData: ',JSON.stringify(formData)));
      debug(clc.cyanBright.bold('\n\n\n'));
      debug(clc.cyanBright.bold('response.body: ',JSON.stringify(response.body)));
      debug(clc.cyanBright.bold('\n\n\n\n\n\n\n'));
      if(response.ok){

        dfd.resolve(response.body);
      } else {

        dfd.reject({code: response.statusCode, message: response.body});
      }
    });

};
