'use strict';

angular.module('granicusService', ['ngResource'])

  .factory('GranicusSearch', ['$resource', '$rootScope', function ($resource, $rootScope) {
    // We use a https proxy for //api.openweathermap.org/data/2.5/weather
    var siteId = _.get(Proud, 'settings.proud_actions_app.global.search_granicus_site');
    //if (siteId != undefined) {
      return $resource( $rootScope.proudcityApiUrl + '/sites/'+ $rootScope.proudcitySiteId + '/proxy/granicus/:siteId', 
        { 
          siteId: siteId,
          q: '@q'
        },
        {
          query: {
            isArray: false
          }
        }
      );
    //}
    
  }]);