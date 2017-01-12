'use strict';

angular.module('app')

.filter('absoluteUrlFilter', 

  function ($rootScope) {
    return function(value) {
      if ($rootScope.rewriteRelativeLink) {
        value = value.replace(/(href|src)="([^:"]*)("|(?:(?:%20|\s|\+)[^"]*"))/gi, 'target="_blank" $1="'+ Proud.settings.global.url +'$2$3');
      }
      return value;
    }
  }
);


