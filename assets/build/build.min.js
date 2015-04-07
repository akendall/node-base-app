(function(){
  'use strict';

  var deps = [
    "ui.router",
    "RouteControllers",
    "AppComponents"
  ]

  var app = angular.module('myapp', deps).config([
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

(function(){
  'use strict';

  var components= [
    "LinkItemComponent",
    "ItemComponent"
  ];

  var ngModule = angular.module('AppComponents', components);

})();

(function() {
'use strict';

  var ngModule = angular.module("Journal", [
  ]);


  ngModule.service('JournalService', [
    '$http',
    '$q',
    '$window',
    function($http, $q, $window) {
      return {};
    }
  ]);

  ngModule.controller('JournalController', [
    '$rootScope',
    '$scope',
    '$location',
    'JournalService',
    '$window',
    function($rootScope, $scope, $location, $window) {
    }
  ]);

})();

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
      $scope.quote = "WE ARE WHAT WE REPEATEDLY DO!";
    }
  ]);

})();

(function(){
  'use strict';

  var ngModule = angular.module('InterestController', []);

  ngModule.controller('InterestController', [
    '$document',
    '$scope',
    '$http',
    '$timeout',
    function($document, $scope, $http, $timeout){

      // I determine if the list item has been selected.
      $scope.isSelected = false;

      $scope.quote = "THE TIME IS ALWAYS RIGHT TO DO WHAT IS RIGHT";
      $scope.author = "~ Martin Luther King, Jr.";

      $scope.interests = [
        {
          name: "Family",
          slides: [{
              src: 'fam1.jpg',
              title: 'Pic 1'
            }, {
              src: 'fam2.jpg',
              title: 'Pic 2'
            }, {
              src: 'fam3.jpg',
              title: 'Pic 3'
            }, {
              src: 'fam4.jpg',
              title: 'Pic 4'
            }, {
              src: 'fam5.jpg',
              title: 'Pic 5'
            }, {
              src: 'fam6.jpg',
              title: 'Pic 6'
            }, {
              src: 'fam7.jpg',
              title: 'Pic 7'
            }, {
              src: 'fam8.jpg',
              title: 'Pic 8'
            }
          ],
          description: "I truly enjoy spending time with my family. Every Saturday we make it a point to spend time together these are some of the things we like to do ...",
          links: [{
            link:"http://www.thelivingplanet.com/index.php",
            title: "The Living Planet Aquarium in Draper, UT"
          }, {
            link:"http://www.hoglezoo.org/",
            title: "Hogle Zoo in Salt Lake City, UT"
          },{
            link:"http://www.rockcanyonutah.com/",
            title: "Hiking in Rock Canyon, Provo UT"
          },{
            link:"http://www.provo.org/community/recreation-center",
            title: "The Provo Recreation Center, Provo UT"
          }]
        },{
        name: "Travel",
        slides: [{
            src: 'trav1.jpg',
            title: 'Pic 1'
          }, {
            src: 'trav2.jpg',
            title: 'Pic 2'
          }, {
            src: 'trav3.jpg',
            title: 'Pic 3'
          }],
        description: "There are so many places I wish to visit and so little time some of which are ...",
          links: [{
            link:"http://www.tripadvisor.com/Tourism-g29220-Maui_Hawaii-Vacations.html",
            title: "Maui, Hawaii"
          }, {
            link:"http://www.nationaltrust.org.uk/white-cliffs-dover/",
            title: "The White Cliffs of Dover, England"
          },{
            link:"http://www.visitscotland.com/en-us/destinations-maps/highlands/",
            title: "The Scottish Highlands, Scotland"
          },{
            link:"http://www.travelchinaguide.com/china_great_wall/",
            title: "The Great Wall of China and ... China"
          },{
            link:"http://www.japan-guide.com/e/e3004.html",
            title: "Asakusa, Japan"
          },{
            link:"http://travel.usnews.com/Rankings/Worlds_Best_Vacations/",
            title: "And so much more."
          }]
        },
        {
          name: "Authors",
          slides: [{
              src: 'con1.jpg',
              title: 'Pic 1'
            }],
          description: "One of my favorite pass times is reading these are some of the authors I highly recommend ...",
          links: [{
            link:"http://brandonsanderson.com/",
            title: "Brandon Sanderson"
          }, {
            link:"http://www.petervbrett.com/",
            title: "Peter V. Brett"
          },{
            link:"http://www.brentweeks.com/",
            title: "Brent Weeks"
          },{
            link:"http://www.patrickrothfuss.com/content/index.asp",
            title: "Patrick Rothfuss"
          },{
            link:"http://www.samsykes.com/",
            title: "Sam Sykes"
          },{
            link:"http://www.robinhobb.com/",
            title: "Robin Hobb"
          },{
            link:"http://authors.simonandschuster.com/Walter-Isaacson/697650",
            title: "Walter Isaacson"
          },{
            link:"http://mykecole.com/",
            title: "Myke Cole"
          }]
        }
      ];

      $scope.slides = $scope.interests[0].slides;

      $scope.switchImgs = function(interest){
        $scope.setCurrentSlide = [];
        $scope.slides = interest.slides;
      }

      $scope.direction = 'left';
      $scope.currentIndex = 0;

      $scope.setCurrentSlide = function(index){
        $scope.currentSlide = $scope.slides[index];
        // sliderFunc();
      };

      $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
        $scope.setCurrentSlide(index);
      };

      $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
      };

      $scope.prevSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $scope.setCurrentSlide($scope.currentIndex);
      };

      $scope.nextSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        $scope.setCurrentSlide($scope.currentIndex);
      };

      // Adding timeout function so that the slider will auto scroll
      var timer;

      var sliderFunc=function(){
    		timer=$timeout(function(){
    			$scope.prevSlide();
    			timer=$timeout(sliderFunc,2000);
    		},4000);
    	};
  		sliderFunc();

      $($document).bind('mouseup',stopTimeout);

      function stopTimeout(){
        $timeout.cancel(timer);
      }

  		$scope.$on('$destroy',function(){
    		$timeout.cancel(timer);
    	});
  }]);
  ngModule.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
  });

})();

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

(function(){
  'use strict';

  var ngModule = angular.module('RouteControllers', [
    "PortfolioController",
    "JournalController",
    "InterestController",
    "ProjectController"
  ]);

})();
