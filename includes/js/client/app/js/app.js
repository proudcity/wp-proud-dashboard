'use strict';

//***************************************

// Main Application

//***************************************

angular.module('app', [
  'ui.router',
  'ngAnimate',
  'site',
  'user',
  'analytics'
])

.run(
  [          '$sce', '$timeout', '$rootScope', '$state', '$stateParams', 
    function ($sce,   $timeout,   $rootScope,   $state,   $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    
      $rootScope.apiUrl = _.get(Proud, 'settings.global.proudcity_api') || '';
      $rootScope.siteId = _.get(Proud, 'settings.global.proudcity_site_id') || '';

      $rootScope.token = _.get(Proud, 'settings.global.token') || localStorage.getItem('id_token');

    }
  ]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider) {

      // See if this is embedded in WordPress
      var token = _.get(Proud, 'settings.global.token');
      if (!token || token == undefined) {
        $locationProvider.html5Mode(true);
      }
      else {
        token = localStorage.getItem('id_token')
      }

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider
        //.when('', '/')
        .otherwise(token ? '/sites' : '/login');

      //////////////////////////
      // State Configurations //
      //////////////////////////


    }
  ]
);


//***************************************

// How to use workflow

//***************************************

// angular.module('healthLiteracy.use', [
//   'ui.router',
// ])

// .config(
//   [          '$stateProvider', '$urlRouterProvider',
//     function ($stateProvider,   $urlRouterProvider) {

//      /////////////////////////////
//       // Redirects and Otherwise //
//       /////////////////////////////

//       // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
//       $urlRouterProvider
//        .when('/use', '/contacts/:id');

//       //////////////////////////
//       // State Configurations //
//       //////////////////////////

//       // Use $stateProvider to configure your states.
//       $stateProvider

//         //////////
//         // Home //
//         //////////

//         .state("home", {

//           // Use a url of "/" to set a state as the "index".
//           url: "/",

//           // Example of an inline template string. By default, templates
//           // will populate the ui-view within the parent state's template.
//           // For top level states, like this one, the parent template is
//           // the index.html file. So this template will be inserted into the
//           // ui-view within index.html.
//           templateUrl: 'views/home.html'
//         });

//     }
//   ]
// );

