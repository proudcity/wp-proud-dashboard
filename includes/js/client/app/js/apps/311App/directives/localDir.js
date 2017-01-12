angular.module('311App')

.directive('serviceHourly', function($rootScope, $state) {
  return {
    restrict: 'A',
    //replace: true,
    scope: {
        item: '=',
    },
    templateUrl: 'views/apps/311App/local/service-hourly.html',
    link: function($scope, $element, $attrs) {

      if ($scope.item.address) {
        var address = $scope.item.address + ', ' + $rootScope.location.city + ', ' + $rootScope.location.state;
        $scope.item.directions = '//maps.google.com/maps/dir//' + encodeURIComponent(address);
      }
      $scope.item.label = $scope.item.label != undefined ? $scope.item.label : [ 'Closed', 'Open' ];

      $scope.toggleHours = function($e) {
        $e.preventDefault();
        $scope.hoursActive = $scope.hoursActive == undefined || !$scope.hoursActive ? true : false;
      }

      $scope.holidays = $rootScope.holidays;
      $scope.toggleHolidays = function($e) {
        $e.preventDefault();
        $scope.holidaysActive = $scope.holidaysActive == undefined || !$scope.holidaysActive ? true : false;
        if ($scope.holidaysActive) {
          $scope.hoursActive = false;
        }
      }

    }
  };
})

.directive('serviceLocation', function($rootScope, $state, Local) {
  return {
    restrict: 'A',
    //replace: true,
    scope: {
        item: '=',
    },
    templateUrl: 'views/apps/311App/local/service-location.html',
    link: function($scope, $element, $attrs) {
      console.log('serviceLocation');

      $scope.data = null;
      Local.get($rootScope.chosenPlace , $scope.item).$promise.then(function(data) {
        if (data.status === 'success') {
          $scope.items = data.result;
        }
        else {
          $scope.items = false;
        }
      });

      $scope.hoursActive = false;
      $scope.toggleHours = function($e) {
        $e.preventDefault();
        $scope.hoursActive = !$scope.hoursActive ? true : false;
      }

      $scope.disclaimerActive = false;
      $scope.toggleDisclaimer = function($e) {
        $e.preventDefault();
        $scope.showDisclaimer = !$scope.showDisclaimer ? true : false;
      }

    }
  };
})


.directive('serviceNeighborhood', function($rootScope, $state, Local) {
  return {
    restrict: 'A',
    //replace: true,
    scope: {
        item: '=',
    },
    templateUrl: 'views/apps/311App/local/service-neighborhood.html',
    link: function($scope, $element, $attrs) {
      console.log('serviceNeighborhood');

      $scope.data = null;

      Local.get($rootScope.chosenPlace , $scope.item).$promise.then(function(data) {
        if (data.status === 'success') {
          obj = {};
          for (var i=0; i < data.result.length; i++) {
            obj[data.result[i].label.toLowerCase()] = data.result[i].value;
          }
          $scope.data = obj;
          console.log('NEIGHBORHOOD', obj);
          //$scope.$apply();
        }
        else {
          $scope.data = false;
        }
      });
    }
  };
})

.directive('serviceBoundary', function($rootScope, $state, Local) {
  return {
    restrict: 'A',
    //replace: true,
    scope: {
        item: '=',
    },
    templateUrl: 'views/apps/311App/local/service-boundary.html',
    link: function($scope, $element, $attrs) {
      console.log('boundary');

      $scope.data = 0;

      Local.get($rootScope.chosenPlace , $scope.item).$promise.then(function(data) {
        if (data.status === 'success') {
          obj = {};
          for (var i=0; i < data.result.length; i++) {
            obj[data.result[i].label.toLowerCase()] = data.result[i].value;
          }
          $scope.data = obj.boundary ? 1 : -1;
          $scope.place = $rootScope.chosenPlace;
          //$scope.$apply();
        }
        else {
          $scope.data = false;
        }
      });
    }
  };
})

.directive('serviceOfficials', function($rootScope, $state, $filter, GoogleRepresentatives) {
  return {
    restrict: 'A',
    //replace: true,
    scope: {
        item: '=',
    },
    templateUrl: 'views/apps/311App/local/service-officials.html',
    link: function($scope, $element, $attrs) {

      $scope.data = null;
      $scope.latlng = $rootScope.chosenPlace.geometry.location.lat() +','+ $rootScope.chosenPlace.geometry.location.lng();

      GoogleRepresentatives.get().$promise.then(function(data) {
        console.log('REPS', data);

        // Filter out to only the officials that match $scope.item.pattern and reformat object.
        var officials = [];
        var pattern = $scope.item.pattern != undefined ? $scope.item.pattern : 'council_district|place'
        for (var i=0; i<data.offices.length; i++) {
          if (data.offices[i].divisionId.match(new RegExp(pattern))) {
            for (var j=0; j<data.offices[i].officialIndices; j++) {
              var index = data.offices[i].officialIndices[j];
              if (index != undefined) {
                data.officials[index].office = data.offices[i].name;
                officials.push(data.officials[index]);
              }
            }
          }
        }
        $scope.officials = officials;
        console.log('OFFICIALS', officials);
      });

      $scope.localOfficial = function(office, official) {
        console.log(office,official)
        return (office.divisionId === official.divisionId);
      }


    }
  };
})

.directive('serviceWeather', function($rootScope, $state, WeatherForecast) {
  return {
    restrict: 'A',
    //replace: true,
    scope: {
        item: '=',
    },
    templateUrl: 'views/apps/311App/local/service-weather.html',
    link: function($scope, $element, $attrs) {

      $scope.data = null;
      //$scope.latlng = $rootScope.chosenPlace.geometry.location.lat +','+ $rootScope.chosenPlace.geometry.location.lng;

      WeatherForecast.get().$promise.then(function(data) {
        console.log('FORECAST', data);
        $scope.data = data;
      });

    }
  };
})

