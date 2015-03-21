'use strict';

// dependencies
var fs = require('fs');

module.exports = function(app){

  var controllersPath = __dirname + '/../controllers',
      controllerFiles = fs.readdirSync(controllersPath);

  loadControllers(controllerFiles);


  function loadControllers(folder) {
    folder.forEach(function (file) {
      if (fs.lstatSync(__dirname + '/../controllers/' + file).isDirectory()) {
        var insideFiles = fs.readdirSync(__dirname + '/../controllers/' + file);
        insideFiles.forEach(function(insideFile) {
          require(__dirname + '/../controllers/' + file + '/' + insideFile)(app);
        });
      } else {
        require(controllersPath+'/'+file)(app);
      }
    });
  }
};
