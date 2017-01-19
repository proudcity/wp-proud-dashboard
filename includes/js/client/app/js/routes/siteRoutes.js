'use strict';


angular.module('site', [
  'proudcityService'
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {


      $stateProvider

        .state("sites", {
          url: '/sites', 
          templateUrl: 'views/site/sites.html',
          resolve: {
            sites: function($stateParams, $rootScope, Site) {
              if (!$rootScope.token) {
                return alert('Not logged in');
              }
              return Site.query().$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, $filter, $timeout, sites) {

            console.log(sites);
            $scope.sites = sites;

            
            
          }
        } )

        .state("site", {
          url: '/sites/:siteId',
          templateUrl: 'views/site/site.html',
          resolve: {
            site: function($stateParams, $rootScope, Site) {
              if (!$rootScope.token) {
                return alert('Not logged in');
              }
              return Site.get({'siteId': $stateParams.siteId}).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, $filter, $timeout, site) {
            $scope.site = site;
          }
        })

        .state("site.dashboard", {
          url: '/dashboard', 
          templateUrl: 'views/site/dashboard.html',
          /*resolve: {
            checklist: function($stateParams, $rootScope, Checklist) {
              if (!$rootScope.token) {
                return alert('Not logged in');
              }
              return Checklist.get({'siteId': $stateParams.siteId}).$promise.then(function(data) {
                return data;
              });
            }
          },*/
          controller: function($scope, $rootScope, $state, $filter, $timeout, site, Checklist) {

            // @todo: this should be able to be in a resolve
            Checklist.get({'siteId': $state.params.siteId}).$promise.then(function(data) {
              $scope.checklist = data;
            });

            $scope.doClick = function(item, $e) {
              $e.preventDefault();
              window.open(site.url + item.link);
            }     

            $scope.accordionClick = function(item, $e) {
              $e.preventDefault();
              item.active = item.active != undefined && item.active ? false : true;
            }

            var markClicked = function(site, item) {
              Checklist.get({'siteId': $state.params.siteId}).$promise.then(function(data) {
                $scope.checklist = data;
              });
            }
            
          }
        })

        .state("site.users", {
          url: '/users', 
          templateUrl: 'views/site/users.html',
          /*resolve: {
            checklist: function($stateParams, $rootScope, Checklist) {
              if (!$rootScope.token) {
                return alert('Not logged in');
              }
              return Checklist.get({'siteId': $stateParams.siteId}).$promise.then(function(data) {
                return data;
              });
            }
          },*/
          controller: function($scope, $rootScope, $state, $filter, $timeout, site, SiteUsers) {

            // @todo: this should be able to be in a resolve
            SiteUsers.query({'siteId': $state.params.siteId}).$promise.then(function(data) {
              $scope.users = data;
              console.log(data);
            });
            
          }
        })

        .state("site.addUsers", {
          url: '/users/add', 
          templateUrl: 'views/site/addUsers.html',
          /*resolve: {
            checklist: function($stateParams, $rootScope, Checklist) {
              if (!$rootScope.token) {
                return alert('Not logged in');
              }
              return Checklist.get({'siteId': $stateParams.siteId}).$promise.then(function(data) {
                return data;
              });
            }
          },*/
          controller: function($scope, $rootScope, $state, $filter, $timeout, site, SiteUsers) {
            $scope.site = site;

            $scope.roles = [
              {
                value: 'editor',
                label: 'Editor'
              },
              {
                value: 'author',
                label: 'Author'
              }
            ]

            // @todo: this should be able to be in a resolve
            SiteUsers.query({'siteId': $state.params.siteId}).$promise.then(function(data) {
              $scope.users = data;
              console.log(data);
            });
            
          }
        })

        
    }
  ]
)