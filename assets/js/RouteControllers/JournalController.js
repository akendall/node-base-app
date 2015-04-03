(function(){
  'use strict';

  var ngModule = angular.module('JournalController', []);

  ngModule.controller('JournalController', [
    '$rootScope',
    '$scope',
    function($scope, $rootScope){
      $scope.quote = "EXELLENCE IS NOT AN ACT BUT A HABIT";
      $scope.author = "~ Aristotle";
  }]);
})();
