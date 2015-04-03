(function(){
  'use strict';

  var app = angular.module('myapp', [
    "ui.router",
    "RouteControllers"
  ]).config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$compileProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider, $compileProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/")

    $stateProvider
    .state('portfolio',{
        url:'/portfolio',
        templateUrl: '/partials/portfolio',
        controller: "PortfolioController"
      })
      .state('journal', {
          url: "/journal",
          templateUrl: "partials/journal.ejs",
          controller: "JournalController"
      })

      .state('interests', {
          url: "/interests",
          templateUrl: "partials/interests.ejs",
          controller: "InterestController"
      })

      .state('projects', {
          url: "/projects",
          templateUrl: "partials/projects.ejs",
          controller: "ProjectController"
      });

      if(history.pushState){
        $locationProvider.html5Mode(true);
      }
  }]);

  app.run([
    '$rootScope', '$state',
    function($rootScope, $state){
     $rootScope.$on('$stateChangeStart', function(evt, to, params) {
       if (to.redirectTo) {
         evt.preventDefault();
         $state.go(to.redirectTo, params);
       }

       // reset back object
       $rootScope.back = null;
       $rootScope.hideTabs = false;
       $rootScope.pageHeading = null;

     });
 }]);

  app.controller('NavCtrl', function($scope, $rootScope, $location) {
    window.ios = $rootScope;
    $scope.isActive = function(route) {
      return $location.path() === route;
    };
  });

})();
