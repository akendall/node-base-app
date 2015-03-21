(function(){
  'use strict';

  var ngModule = angular.module('AboutController', []);

  ngModule.controller('AboutController', [
    '$rootScope',
    'AboutService',
    function($rootScope, AboutService){
  }]);
})();
