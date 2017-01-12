'use strict';

angular.module('openweathermapService', ['ngResource'])

  .factory('WeatherForecast', ['$resource', '$rootScope', function ($resource, $rootScope) {
    // We use a https proxy for //api.openweathermap.org/data/2.5/weather
    return $resource( $rootScope.proudcityApiUrl + '/sites/'+ $rootScope.proudcitySiteId + '/proxy/weather', 
      { 
        lat: $rootScope.chosenPlace != undefined ? (typeof $rootScope.chosenPlace.geometry.location.lat == 'function' ? $rootScope.chosenPlace.geometry.location.lat() : $rootScope.chosenPlace.geometry.location.lat) : $rootScope.location.lat,
        lon: $rootScope.chosenPlace != undefined ? (typeof $rootScope.chosenPlace.geometry.location.lng == 'function' ? $rootScope.chosenPlace.geometry.location.lng() : $rootScope.chosenPlace.geometry.location.lng) : $rootScope.location.lng,
        units: 'imperial',
        appid: $rootScope.openweathermapKey
      },
      {
        get: {
          isArray: false
        }
      }
    );
  }]);




