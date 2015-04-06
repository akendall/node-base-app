(function() {
  'use strict';

  var ngModule = angular.module("ItemComponent", [

  ]);

    ngModule.directive('item', [
      '$document',
      '$rootScope',
      function($document, $rootScope) {
        var partialDir = '/partials/components/';

        return {
          restrict: 'E',
          replace: true,
          scope: {
            label: '@',
            information: '@'
          },
          templateUrl: partialDir+'Item',
          controller: 'ItemController',
          link: function(scope, element, attrs) {

          }
        };
      }]);


  ngModule.controller("ItemController", [
    "$scope",
    '$rootScope',
    "$window",
    "$document",
    function($scope, $rootScope, $window, $document) {

      $window.ios = $scope;
    }
  ]);

})();
