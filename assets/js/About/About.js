(function() {
'use strict';

  var ngModule = angular.module("About", [
  ]);


  ngModule.service('AboutService', [
    '$http',
    '$q',
    '$window',
    function($http, $q, $window) {
      return {};
    }
  ]);

  ngModule.controller('AboutController', [
    '$rootScope',
    '$scope',
    '$location',
    'AboutService',
    '$window',
    function($rootScope, $scope, $location, $window) {
    }
  ]);

})();
