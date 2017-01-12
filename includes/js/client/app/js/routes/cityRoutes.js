'use strict';

//angular.module('app.faq', [
//  'ui.router' 
//])
angular.module('311AppParent')


.config(
  [ '$stateProvider', '$urlRouterProvider', 'Menu311Provider',
    function ($stateProvider, $urlRouterProvider, Menu311Provider) {
      // Redirect if on city hompage
      // $urlRouterProvider.when(/\//i, ['$match', '$stateParams', function ($match, $stateParams) {
      //   return '/answers';
      // }]);

      // $urlRouterProvider.otherwise(Menu311Provider.default311Url);

      $stateProvider
        // FAQ depth 0
        .state("city", {
          url: '/city', 
          abstract: true,
          template: '<div app-311-wrap></div>'
        } );
      // })
    }
  ]
)