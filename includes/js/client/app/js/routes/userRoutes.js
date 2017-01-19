'use strict';


angular.module('user', [
  'auth0.lock',
  'proudcityService'
])

.config(
  [ '$stateProvider', '$urlRouterProvider', 'lockProvider',
    function ($stateProvider, $urlRouterProvider, lockProvider) {
      // Redirect if on city hompage
      // $urlRouterProvider.when(/\//i, ['$match', '$stateParams', function ($match, $stateParams) {
      //   return '/answers';
      // }]);

      // Init Auth0
      var showLogin = false;
      if (_.get(Proud, 'settings.global.auth0')) {
        showLogin = true;

        lockProvider.init({
          domain: _.get(Proud, 'settings.global.auth0.domain') || '',
          clientID: _.get(Proud, 'settings.global.auth0.clientID') || '',
          options: {
            icon: 'https://s.gravatar.com/avatar/e03d599ad377f00d233bf9d00f538878?s=80',
            container: 'widget-container',
            focusInput: false,
            popup: true,
            responseType: 'token'
          }
        });
      }



      $stateProvider

        .state("login", {
          url: '/login', 
          templateUrl: 'views/user/login.html',
          controller: function($scope, $rootScope, $state, $filter, $timeout, lock){

            lock.on('authenticated', function(authResult) {
              localStorage.setItem('id_token', authResult.idToken);
              $state.go('sites');
            });
            lock.interceptHash();

            $timeout(function () {
              // Show Auth0
              if ($rootScope.token == undefined || !$rootScope.token) {
                lock.show();
              }
              else {
                $state.go('sites');
              }
            });
            
          }
        } )

        .state("start", {
          url: '/start', 
          templateUrl: 'views/user/start.html'
        } );
        
    }
  ]
)