(function() {
  'use strict';

  var ngModule = angular.module("LinkItemComponent", [

  ]);

    ngModule.directive('linkItem', [
      '$document',
      '$rootScope',
      function($document, $rootScope) {
        var partialDir = '/partials/components/';

        return {
          restrict: 'E',
          replace: true,
          scope: {
            link: '@',
            title: '@'
          },
          templateUrl: partialDir+'LinkItem',
          controller: 'LinkItemController',
          link: function(scope, element, attrs) {

          }
        };
      }]);


  ngModule.controller("LinkItemController", [
    "$scope",
    '$rootScope',
    "$window",
    "$document",
    function($scope, $rootScope, $window, $document) {

      $window.ios = $scope;
    }
  ]);

})();
