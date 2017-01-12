angular.module('311App')

.directive('pcLocate', function($rootScope, $state) {
  return {
    restrict: 'E',
    scope: {
        state: '=',
        requireAddress: '=',
        place: '@'
    },
    templateUrl: 'views/apps/311App/pc-locate.html',
    link: function($scope, $element, $attrs, place) {
      $attrs.requireAddress = $attrs.requireAddress != undefined && $attrs.requireAddress == "" ? true : false;
      $scope.geolocation = navigator.geolocation;
      $scope.geolocationLoading = false;

      var defaultBounds = null
      if ($rootScope.location.bounds != undefined) {
        var points = JSON.parse($rootScope.location.bounds);
        defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(parseFloat(points.north), parseFloat(points.west)),
          new google.maps.LatLng(parseFloat(points.south), parseFloat(points.east)));
        console.log(points);
        var pt = new google.maps.LatLng($rootScope.location.lat, $rootScope.location.lng);
        console.log(pt);
        console.log('CONTAINS ', defaultBounds.contains(pt) );
      }

      var options = {
        types: [],
        componentRestrictions: {country: 'us'},
        // bounds: defaultBounds
      };
      console.log(options);
      var gPlace = new google.maps.places.Autocomplete($element.find('.input-lg')[0], options);

      // Add destroy
      $scope.$on('$destroy', function() {
        // @TODO remove CSS + empty .pac-container divs
        // autocomplete.unbindAll(gPlace);
        // $element.find('.input-lg')[0].remove();
        // google.maps.event.clearInstanceListeners(gPlace);
      });

      google.maps.event.addListener(gPlace, 'place_changed', function() {
          $scope.chosenUpdate(gPlace.getPlace());
          //$scope.$apply(function() {
          //    place.$setViewValue($element.val());                
          //});
      });

      $scope.locate = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $rootScope.chosenPlace = null;
            $scope.geolocationLoading = true;

            if ($attrs.requireAddress) {
              var geocoder = new google.maps.Geocoder;
              var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};

              geocoder.geocode({'location' : latlng}, function(results, status) {    
                if (status === 'OK') {                   
                  $rootScope.chosenPlace = results[0];
                  if (localStorage.getItem('chosenPlace')) {
                    localStorage.setItem('chosenPlace', JSON.stringify($rootScope.chosenPlace));
                  }
                  $scope.geolocationLoading = false;
                  $state.go($attrs.state, {
                    latlng: position.coords.latitude +','+ position.coords.longitude,
                    address: $rootScope.chosenPlace.formatted_address
                  });
                } else {
                  alert('Sorry, there was an issue getting an address for your current location. Please try typing your address above.');
                }          
              });

            } else {

              $scope.geolocationLoading = false;
              $state.go($attrs.state, {
                latlng: position.coords.latitude +','+ position.coords.longitude
              });

            }

          }); // getCurrentPosition
          
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }

      $scope.chosenUpdate = function(chosenPlace) {
        if (chosenPlace != null) {
          $rootScope.chosenPlace = chosenPlace;
          $scope.chosenPlace = chosenPlace;
          console.log('CHOSEN: ' + $rootScope.chosenPlace.geometry.location.lat());
          $state.go($attrs.state, {
            latlng: $rootScope.chosenPlace.geometry.location.lat() +','+ $rootScope.chosenPlace.geometry.location.lng(),
            address: $attrs.requireAddress ? $rootScope.chosenPlace.formatted_address : null
          });
        }
      }
    }
  };
})



.directive('pcLocateSave', function($rootScope, $state) {
  return {
    restrict: 'E',
    /*scope: {
        state: '=',
        requireAddress: '=',
        place: '@'
    },*/
    replace: true,
    templateUrl: 'views/apps/311App/pc-locate-save.html',
    link: function($scope, $element, $attrs) {
      // Save address button. Default address is set in 311app.js
      $scope.saveAddress = localStorage.getItem('chosenPlace') ? true : false;
      $scope.toggleSaveAddress = function() {
        if ($scope.saveAddress) {
          localStorage.setItem('chosenPlace', JSON.stringify($rootScope.chosenPlace));
        }
        else {
          localStorage.removeItem('chosenPlace');
        }
      }

      // Toggle save address help info
      $scope.showSaveInfo = false;
      $scope.toggleSaveInfo = function($e) {
        $e.preventDefault();
        $scope.showSaveInfo = !$scope.showSaveInfo;
      }
    }

  };
});
