'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $stateProvider

        .state("city.map", {
          templateUrl: 'views/apps/311App/map/map.html',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Maps'
          },
          resolve: {
            layers: function($rootScope){
              return _.get(Proud, 'settings.proud_actions_app.global.map_layers') || [];
            }
          },
          url: "/maps",
          controller: function($scope, $rootScope, $state, layers){
            $scope.layers = layers;
            
            $scope.go = function(item, $e) {
              $e.preventDefault();
              switch (item.type) {
                case 'wordpress':
                  $state.go('city.map.wordpress', {slug: item.slug});
                  break;
                case '"googlePlaces"':
                  $state.go('city.map.googlePlaces', {term: item.term});
                  break;
                default:
                  $state.go('city.map.' + item.type);
              }
            }
          }
        })

        .state("city.map.view", {
          templateUrl: 'views/apps/311App/map/view.html',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'View map'
          },
          url: "/:slug",
          controller: function($scope, $rootScope, $state, $filter, layers){
            $scope.layerSlug = $state.params.slug;
            $scope.layer = $filter('filter')($scope.layers, { slug: $state.params.slug })[0];
            $scope.layerLoading = false;
          }
        })

        .state("city.map.view.wordpress", {
          template: ' ',//'views/apps/311App/map/listing.html',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Listing'
          },
          url: "/wordpress/:listingSlug",
          controller: function($scope, $rootScope, $state, $filter, layers){
            $scope.$parent.listingSlug = $state.params.listingSlug;
            //$scope.layer = $filter('filter')($scope.layers, { slug: $state.params.slug })[0];
          }
        })

        /*.state("city.map.googlePlaces", {
          templateUrl: 'views/apps/311App/map/view.html',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Maps'
          },
          url: "/places/:term",
          controller: function($scope, $rootScope, $state){
            alert('todo!');
          }
        })

        .state("city.map.traffic", {
          templateUrl: 'views/apps/311App/map/view.html',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Traffic'
          },
          url: "/traffic",
          controller: function($scope, $rootScope, $state){
            alert('todo!');
          }
        })

        /*.state("city.payments.type", {
          templateUrl: 'views/apps/311App/payment/payment-type.html',
          url: "/:slug",
          resolve: {
            post: function($stateParams, $filter, posts) {
              return $filter('filter')(posts, { slug: $stateParams.slug })[0];
            }
          },
          controller: function($scope, $rootScope, $state, post, Payment){
            //console.log(post);
            $scope.post = post;
            $scope.demoInfo = false;
            $scope.payment = {
              id: '',
              amount: ''
            }
            $scope.idClass = '';

            $scope.demoInfoToggle = function (e) {
              $scope.demoInfo = !$scope.demoInfo;
              e.preventDefault();
            }

            // Talk to invoice API
            $scope.$watch('payment.id', function(){
              if ($scope.payment.id != '' && $scope.payment.id.length > 3) {
                $scope.idClass = 'has-warning';
                Payment.get({
                  city: $scope.location != undefined ? $scope.location.city : null,
                  state: $scope.location != undefined ? $scope.location.state : null,
                  id: $scope.payment.id
                }, function(data) {
                  if (data.amount != undefined) {
                    $scope.payment.amount = data.amount;
                    $scope.payment.name = data.name;
                    $scope.idClass = 'has-success';
                  }
                  else {
                    $scope.payment.amount = '';
                    $scope.idClass = 'has-error';
                  }
                });
              }
              else {
                $scope.idClass = '';
              }
            });

            // Submit
            $scope.submit = function(payment) {
              window.location = $scope.post.link + '?amount=' + $scope.payment.amount + '&id=' + $scope.payment.id;
            }


          }
        })*/
        


    }
  ]
)


