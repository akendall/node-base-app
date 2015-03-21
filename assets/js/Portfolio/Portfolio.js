(function() {
'use strict';

  var ngModule = angular.module("Portfolio", [
  ]);


  ngModule.service('PortfolioService', [
    '$http',
    '$q',
    '$window',
    function($http, $q, $window) {
      return {};
    }
  ]);

  ngModule.controller('PortfolioController', [
    '$rootScope',
    '$scope',
    '$location',
    'PortfolioService',
    '$window',
    function($rootScope, $scope, $location, AppAdminService, $window) {
    }
  ]);

})();
