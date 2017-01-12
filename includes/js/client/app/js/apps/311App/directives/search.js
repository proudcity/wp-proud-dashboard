'use strict';

angular.module('311App')

.directive('search', function factory($rootScope, $state) {
  return {
    restrict: 'E',
    templateUrl: 'views/apps/311App/search.html',
    link: function($scope, $element, $attrs) {

      var instance = 'settings.proud_actions_app.instances.' + $rootScope.appId;
      var searchActive = _.get(Proud, instance + '.search');
      $scope.searchActive = searchActive != undefined && searchActive !== false ? true : false;

      $scope.doSearch = function($e) {
        $state.go('city.search')
      }

    }
  }
})
