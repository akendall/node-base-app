(function() {
'use strict';

  var ngModule = angular.module("PortfolioController", []);

  ngModule.controller('PortfolioController', [
    '$rootScope',
    '$scope',
    '$location',
    '$window',
    function($rootScope, $scope, $location, PortfolioService, $window) {
      $scope.quote = "WE ARE WHAT WE REPEATEDLY DO";
      $scope.author = "~ Aristotle";

      $scope.seller = "My name is Andrew Kendall. I strive to be the best at whatever I set out to do."
        +" I believe greatness comes from hard work and dedication. This is"
        +" especially true in technology. I worked hard in school to learn all"
        +" that I could. My first developer job I had was as a web development for Novell."
        +" Novell allowed me to grow as a developer and it was there I was first"
        +" introduced to both front end and back end development in a Java environment."
        +" After I gratuated I was offered an internship working for FamilySearch, it was here"
        +" that I learned AngularJS and the Node.js platform. I learned so much working for"
        +" FamilySearch and Novell. I have been blessed to have worked with so much talent"
        +" who helped me grow into the developer I am.";
    }
  ]);

})();
