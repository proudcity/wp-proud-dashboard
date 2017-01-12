'use strict';

angular.module('proudcityService', ['ngResource'])

  .factory('pcAnalytics', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/sites/:siteId/analytics', 
      {
        'siteId': $rootScope.siteId
      },
      {
        get: {
          method:'GET',
          headers: {
              'Authorization': 'Bearer ' + $rootScope.token
          },
          cache: true
        }
      }
    );
  }])