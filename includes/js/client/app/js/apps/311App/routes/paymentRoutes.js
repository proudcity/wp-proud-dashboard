'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $stateProvider

        .state("city.payments", {
          templateUrl: 'views/apps/311App/payment/payment.html',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Payments'
          },
          url: "/payments",
          resolve: {
            posts: function($stateParams, Post) {
              return Post.query({postType: 'payments'}).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, posts){
            $scope.posts = posts;
          }
        })

        .state("city.payments.type", {
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
        })



        .state("city.payments.success", {
          templateUrl: 'views/apps/311App/payment/payment-success.html',
          url: "/:nid/:token",
          resolve: {
            post: function($stateParams, $filter, posts) {
              return $filter('filter')(posts, { nid: $stateParams.nid })[0];
            },
          },
          controller: function($scope, $rootScope, $state, post, Payment){
            

          }
        })
        


    }
  ]
)


