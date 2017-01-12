'use strict';

angular.module('localService', ['ngResource'])
  .factory('Local', ['$resource', '$rootScope', function ($resource, $rootScope) {
    // the resource
    var resource = $resource($rootScope.proudcityApiUrl + '/sites/:siteId/local',
      {
        siteId: $rootScope.proudcitySiteId
      },
      {
        get: {
          isArray: false
        }
      }
    );

    // builds default params
    var defaultParams = function(place) {
      return {  
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        street_number: place.address_assoc.street_number,
        route: place.address_assoc.route,
        route_short: place.address_assoc.route_short,
        postal_code: place.address_assoc.postal_code,
        locality: place.address_assoc.locality
      }
    }

    return {
      get: function(place, params) {
        return resource.get(_.extend(params, defaultParams(place)));
      }
    };
  }]);




