'use strict';


angular.module('311App')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider
        //.when('', '/answers');

      $stateProvider
  
        .state("city.search", {
          url: '/search',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Check Status'
          },
          templateUrl: 'views/apps/311App/search/search.html',
          controller: function($scope, $rootScope, $state, $window, $sce, Search){

            $scope.term = '';
            $scope.results = false;
            $scope.loading = false;
            $scope.additional = _.get(Proud, 'settings.proud_actions_app.global.search_additional');
            
            $scope.trustHtml = function(html) {
              return $sce.trustAsHtml(html);
            }

            $scope.autocomplete = function() {
              $scope.loading = true;
              Search.query({
                term: $scope.term
              }).$promise.then(function(data) {
                $scope.results = data;
                $scope.loading = false;
              });
            }

            $scope.go = function(item, $e) {
              $e.preventDefault();
              if (item.action_attr != undefined && item.action_attr != '') {
                var hash = 'city/' + item.action_attr + item.action_hash;
                $window.location.hash = hash;
              }
              else {
                $window.open(item.url);
              }
            }

            $scope.googleSearch = function($e) {
              $e.preventDefault(); 
              var searchPrefix =  _.get(Proud, 'settings.proud_actions_app.global.search_prefix') || 'https://www.google.com/search?q=';
              var searchSuffix =  _.get(Proud, 'settings.proud_actions_app.global.search_suffix') || '';
              var url = searchPrefix + encodeURIComponent($scope.term + searchSuffix);
              $window.open(url);
            }
          }
        })

        


    }
  ]
);
