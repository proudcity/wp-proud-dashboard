'use strict';

angular.module('311App')

  .factory('GoogleCivicInfo', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource('https://www.googleapis.com/civicinfo/v2/voterinfo', 
      { 
        'key': $rootScope.googleKey,
        'electionId': $rootScope.googleElectionId
      },
      {
        query: {
          isArray: false
        }
      }
    );
  }])

  .factory('GoogleRepresentatives', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource('https://www.googleapis.com/civicinfo/v2/representatives', 
      { 
        'key': $rootScope.googleKey,
        'address': $rootScope.chosenPlace.formatted_address
      },
      {
        query: {
          isArray: false
        }
      }
    );
  }]);
