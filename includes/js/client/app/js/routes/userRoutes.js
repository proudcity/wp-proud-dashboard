'use strict';


angular.module('user', [
  'proudcityService'
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // Redirect if on city hompage
      // $urlRouterProvider.when(/\//i, ['$match', '$stateParams', function ($match, $stateParams) {
      //   return '/answers';
      // }]);

      // $urlRouterProvider.otherwise(Menu311Provider.default311Url);

      $stateProvider

        .state("login", {
          url: '/login', 
          abstract: true,
          templateUrl: 'views/user/login.html',
        } )

        .state("start", {
          url: '/start', 
          abstract: true,
          templateUrl: 'views/user/start.html',
        } );
        
    }
  ]
)