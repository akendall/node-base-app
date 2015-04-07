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
