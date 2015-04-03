(function(){
  'use strict';

  var ngModule = angular.module('ProjectController', []);

  ngModule.controller('ProjectController', [
    '$rootScope',
    '$scope',
    function($scope, $rootScope){
      $scope.quote = "THE TRUE SIGN OF INTELLIGENCE IS IMAGINATION";
      $scope.author = "~ Albert Einstein";
  }]);
})();
