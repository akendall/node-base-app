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

      $scope.experince = "The first programming job I had was for a company called Novell. Novell was good enough to "
        +"give me a job even though I had very little experince, and was only in my first semester of school. I leaned "
        +"the Java programming language. I was able to start working as a web developer under Robert Hodgkin. I worked on "
        +"their internal calander and was able to own that app and grow as a developer. Working for Novell helped me to excell "
        +"in school. I will always be greatful to Novell for the experience they gave me and the opportunity I had to work for "
        +"them."

      $scope.experience2 = "One of the biggest growing experiences was working for the Church of Jesus Christ of Latter "
        +"Day Saints. I started working for FamilySearch January after I graduated school. Up until that point I was still "
        +"fairly new to programming. I wasn't sure if I wanted to program for the rest of my life yet or not. After "
        +"about a week working for FamilySearch I knew that programming was where I belonged. The challenges it provides "
        +"give me the opportunity to problem solve and I need that mental stimulation in order to enjoy what I do. "
        +"I enjoyed every minute I worked for the church and I am greatful for everyone I had the opportunity to work with. "
        +"They had a great culture and provided a great work environment."

      $scope.experience3 = "In 2005 I was working for the construction industy as a framer. This is when I first heard about "
        +"Xactware. I was building a house for a friend of mine who worked for Xactware, and he got my brother a job working "
        +"there. I remember how much my brother liked the company and I knew it was a great company to work for. "
        +"I am so greatful for the chance that I have to work for Xactware as my first full time position out of college. "
        +"It is the perfect job for me. I am excited because it will implement my past framing experience while allowing me "
        +"to build upon my passion for programming."

      $scope.info = [{
        label: "Intro",
        information: $scope.seller
      }, {
        label: "Novell",
        information: $scope.experince
      }, {
        label: "FamilySearch",
        information: $scope.experience2
      }, {
        label: "Xactware",
        information: $scope.experience3
      }];
      
    }
  ]);

})();
