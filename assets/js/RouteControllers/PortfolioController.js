(function(){
  'use strict';

  var ngModule = angular.module('PortfolioController', []);

  ngModule.controller('PortfolioController', [
    '$rootScope',
    'PortfolioService',
    function($rootScope, PortfolioService){
  }]);
})();
