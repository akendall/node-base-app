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
          description: "I truly enjoy spending time with my family. It is important to me to watch my children grow up and be a part of their lives"

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
        description: "There are so many places I wish to visit and so little time"
        },
        {
          name: "Framing",
          slides: [{
              src: 'con1.jpg',
              title: 'Pic 1'
            }],
          description: "When I am not building in the virtual world I enjoy working with my hands"
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
