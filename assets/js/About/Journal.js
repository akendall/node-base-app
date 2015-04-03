(function() {
'use strict';

  var ngModule = angular.module("Journal", [
  ]);


  ngModule.service('JournalService', [
    '$http',
    '$q',
    '$window',
    function($http, $q, $window) {
      return {};
    }
  ]);

  ngModule.controller('JournalController', [
    '$rootScope',
    '$scope',
    '$location',
    'JournalService',
    '$window',
    function($rootScope, $scope, $location, $window) {
    }
  ]);

})();
