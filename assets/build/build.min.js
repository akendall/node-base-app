var myapp = angular.module('myapp', ["ui.router"])
myapp.config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('portfolio', {
        url: "/portfolio",
        templateUrl: "partials/portfolio.ejs"
    })

    .state('about', {
        url: "/about",
        templateUrl: "partials/about.ejs"
    })

    .state('interests', {
        url: "/interests",
        templateUrl: "partials/interests.ejs"
    })

    .state('projects', {
        url: "/projects",
        templateUrl: "partials/projects.ejs"
    })
})

(function(){
  'use strict';

  var components= [
    // "ListComponent",
    // "ItemComponent",
    // "SearchComponent",
    // "AddItemComponent"
  ];

  var ngModule = angular.module('CASComponents', components);

})();

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

(function(){
  'use strict';

  var ngModule = angular.module('AboutController', []);

  ngModule.controller('AboutController', [
    '$rootScope',
    'AboutService',
    function($rootScope, AboutService){
  }]);
})();

(function(){
  'use strict';

  var ngModule = angular.module('PortfolioController', []);

  ngModule.controller('PortfolioController', [
    '$rootScope',
    'PortfolioService',
    function($rootScope, PortfolioService){
  }]);
})();

(function(){
  'use strict';

  var routeControllers= [
    "PortfolioController",
    "AboutController"
  ];

  var ngModule = angular.module('RouteControllers', routeControllers);

})();
