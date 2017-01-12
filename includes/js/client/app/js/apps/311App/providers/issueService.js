'use strict';

angular.module('issueService', ['ngResource'])

  .factory('IssueTypes', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.proudcityApiUrl + '/issues/:siteId/types',
      { 'siteId': $rootScope.proudcitySiteId },
      {
        query: {
          isArray: false
        }
      }
    );
  }])

  .factory('IssueFields', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.proudcityApiUrl + '/issues/:siteId/types/:type',
      { 
        'siteId': $rootScope.proudcitySiteId,
        'type': '@type' 
      }
    );
  }])

  .factory('Issue', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.proudcityApiUrl + '/issues/:siteId/:code', 
      { 
        'siteId': $rootScope.proudcitySiteId,
        'code': '@code'
      },
      {
        get: {
          isArray: false
        }//,
        //save: {
        //  headers:{'Authorization': 'Basic jeff@albatrossdigital.com:test123'} 
        //}
      }
    );
  }])

  .factory('IssueAddress', ['$resource', '$rootScope', function ($resource, $rootScope) {
  return $resource($rootScope.proudcityApiUrl + '/issues/:siteId/types/:type/address', 
    { 
      'siteId': $rootScope.proudcitySiteId,
      'type': '@type'
    },
    {
      get: {
        isArray: false
      }
    }
  );
}])
