'use strict';

angular.module('proudcityService', ['ngResource'])
  
  .factory('Site', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/sites/:siteId', 
      {
        'siteId': '@siteId'
      },
      {
        get: {
          method:'GET',
          headers: {
              'Authorization': 'Bearer ' + $rootScope.token
          },
          cache: true
        },
        query: {
          method:'GET',
          headers: {
              'Authorization': 'Bearer ' + $rootScope.token
          },
          cache: false,
          isArray: true
        }
      }
    );
  }])

  .factory('SiteChecklist', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/sites/:siteId/checklist', 
      {
        'siteId': '@siteId'
      },
      {
        get: {
          method:'GET',
          headers: {
              'Authorization': 'Bearer ' + $rootScope.token
          },
          isArray: true
        }
      }
    );
  }])

  .factory('SiteChecklistItem', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/sites/:siteId/checklist/:checklistKey', 
      {
        'siteId': '@siteId',
        'checklistKey': '@checklistKey'
      },
      {
        update: {
          method:'PATCH',
          headers: {
              'Authorization': 'Bearer ' + $rootScope.token
          },
        }
      }
    );
  }])

  .factory('SiteUsers', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/sites/:siteId/users', 
      {
        'siteId': '@siteId'
      },
      {
        query: {
          method:'GET',
          headers: {
              'Authorization': 'Bearer ' + $rootScope.token
          },
          isArray: true
        }
      }
    );
  }])

  

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