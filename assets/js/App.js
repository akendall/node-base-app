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
