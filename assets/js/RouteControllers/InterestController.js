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
