'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $stateProvider

        .state("city.gravityform", {
          url: '/form/:id',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Complete form'
          },
          templateUrl: 'views/apps/311App/post/gravityform-iframe.html',
          /*resolve: {
            post: function($stateParams, $filter, Post) {
              var key = !isNaN(parseInt($stateParams.slug)) ? 'id' : 'slug';
              return Post.get({
                key: $stateParams.slug
              }).$promise.then(function(data) {
                return data;
              });
            }
          },*/
          controller: function($scope, $rootScope, $state, $sce, $window){
            //console.log(post);
            //$scope.post = post;
            $scope.trustSrc = function(post) {
              //console.log(post);
              var src = $rootScope.gravityformsIframe + $state.params.id;
              console.log('IFRAME', src);
              return $sce.trustAsResourceUrl(src);
            }

            $scope.back = function($e) {
              $e.preventDefault();
              $window.history.back();
            }
          }
        })

    }
  ]
)


