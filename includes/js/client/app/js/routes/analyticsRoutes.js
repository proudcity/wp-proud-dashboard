'use strict';

angular.module('analytics', [
  'proudcityService',
  'ngAnalytics'
])

/*.run(['ngAnalyticsService', function (ngAnalyticsService) {
    ngAnalyticsService.setClientId(); // e.g. xxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
}])*/

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // Redirect if on city hompage
      // $urlRouterProvider.when(/\//i, ['$match', '$stateParams', function ($match, $stateParams) {
      //   return '/answers';
      // }]);

      // $urlRouterProvider.otherwise(Menu311Provider.default311Url);

      $stateProvider

        .state("analytics", {
          url: '/analytics', 
          templateUrl: 'views/analytics/dashboard.html',
          resolve: {
            config: function($stateParams, $rootScope, pcAnalytics) {
              return pcAnalytics.get().$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, $filter, config){
            console.log('asdf');
            console.log(config);
            $scope.config = config;

            // use https://ga-dev-tools.appspot.com/query-explorer/
            var colors = ['#4D5360','#949FB1','#D4CCC5','#E2EAE9','#F7464A'];
            var strokes = [

            ]
            $scope.charts = {
              'sessions': {
                query: {
                  'ids': config.id, // The Demos & Tools website view.
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'metrics': 'ga:sessions,ga:users',
                  'dimensions': 'ga:date'
                },
                chart: {
                  'container': 'ga-visits',
                  'type': 'LINE',
                  'options': {
                    'width': '100%',
                    'colors': colors
                  }
                }
              },
              'pagelist': {
                query: {
                  'ids': config.id, // The Demos & Tools website view.
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'metrics': 'ga:pageviews',
                  'dimensions': 'ga:pagePath',
                  'sort': '-ga:pageviews',
                  //'filters': 'ga:pagePathLevel1!=/',
                  'max-results': 10
                },
                chart: {
                  'container': 'ga-pages-list',
                  type: 'TABLE',
                  'options': {
                    'width': '100%',
                  }
                }
              },
              'searchlist': {
                query: {
                  'ids': config.id, // The Demos & Tools website view.
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'metrics': 'ga:eventValue',
                  'dimensions': 'ga:eventLabel',
                  'sort': '-ga:eventValue',
                  'filters': 'ga:eventCategory==SearchClick',
                  'max-results': 10
                },
                chart: {
                  'container': 'ga-searches-list',
                  type: 'TABLE',
                  'options': {
                    'width': '100%',
                  }
                }
              },
              'browsers': {
                query: {
                  'ids': config.id, // The Demos & Tools website view.
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'metrics': 'ga:sessions',
                  'dimensions': 'ga:browser',
                  'sort': '-ga:sessions',
                  'max-results': 7
                },
                chart: {
                  'container': 'ga-browsers-pie',
                  type: 'PIE',
                  'options': {
                    'width': '100%',
                    'pieHole': 4/9,
                    'colors': colors,
                  }
                }
              },
              'devices': {
                query: {
                  'ids': config.id, // The Demos & Tools website view.
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'metrics': 'ga:sessions',
                  'dimensions': 'ga:deviceCategory',
                  'max-results': 7
                },
                chart: {
                  'container': 'ga-devices-pie',
                  type: 'PIE',
                  'options': {
                    'width': '100%',
                    'pieHole': 4/9,
                    'colors': colors,
                  }
                }
              },
              'answerscategorylist': {
                query: {
                  'ids': config.id, // The Demos & Tools website view.
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'metrics': 'ga:totalEvents',
                  'dimensions': 'ga:eventLabel',
                  'sort': '-ga:totalEvents',
                  'filters': 'ga:eventCategory==ActionsApp;ga:eventAction==category open',
                  'max-results': 10
                },
                chart: {
                  'container': 'ga-answers-category-list',
                  type: 'TABLE',
                  'options': {
                    'width': '100%',
                  }
                }
              },
              'answerslist': {
                query: {
                  'ids': config.id, // The Demos & Tools website view.
                  'start-date': '30daysAgo',
                  'end-date': 'yesterday',
                  'metrics': 'ga:totalEvents',
                  'dimensions': 'ga:eventAction',
                  'sort': '-ga:totalEvents',
                  'filters': 'ga:eventCategory==Answer',
                  'max-results': 10
                },
                chart: {
                  'container': 'ga-answers-list',
                  type: 'TABLE',
                  'options': {
                    'width': '100%',
                  }
                }
              },



            }

          }
        } );

    }
  ]
)

.directive('gchart', function factory($window, $browser) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {

      console.log('asdf');
    }
  }
});