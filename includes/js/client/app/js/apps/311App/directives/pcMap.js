'use strict';

angular.module('311App')

.directive('pcMap', function factory($rootScope, $state, $filter, $window, Post, NgMap) {
  return {
    restrict: 'E',
    scope: {
      center: '@',
      zoomToMarkers: '@',
      zoom: '=',
      activeLayer: '=',
      activeItem: '=',
      showHome: '=',
      showTitle: '=',
      layerLoading: '=',
      legend: '@',
      legendTitle: '@',
      titleSuffix: '@'
    },
    templateUrl: 'views/apps/311App/map/map-wrapper.html',
    link: function($scope, $element, $attrs) {
      //var instance = 'instances.' + $rootScope.appId;

      $scope.mapZoom = $attrs.zoom ? $attrs.zoom : 12;
      $scope.height = $attrs.height;
      // Grab the center, first from saved location (if we're showing the home marker, then from attrs, lastly from sitewide lat/lng.
      $scope.center = $attrs.showHome && $rootScope.chosenPlace ? $rootScope.chosenPlace.geometry.location :
        $scope.center ? $scope.center : 
        $rootScope.location;

      $scope.layers = _.get(Proud, 'settings.proud_actions_app.global.map_layers');

      if ($scope.activeLayer == undefined || $attrs.activeLayer == null) {
        $scope.layer = $scope.layers[0];
      }
      else if ($scope.activeLayer == 'random') {
        $scope.layer = $scope.layers[Math.floor( Math.random() * $scope.layers.length )];
      }
      else {
        $scope.layer = $filter('filter')($scope.layers, { slug: $scope.activeLayer })[0];
      } 


      //$scope.layer = $scope.layers[0];
      var mapLayers = {};
      var gMap;

      NgMap.getMap().then(function(map) {
        gMap = map;

        // Add home marker
        if ($attrs.showHome && $rootScope.chosenPlace) {
          var chosenPlace = $rootScope.chosenPlace.geometry.location;
          $scope.home = new Marker({
            map: gMap,
            position: new google.maps.LatLng(
              typeof chosenPlace.lat == 'function' ? chosenPlace.lat() : chosenPlace.lat,
              typeof chosenPlace.lng == 'function' ? chosenPlace.lng() : chosenPlace.lng
            ),
            title: $rootScope.chosenPlace.address_assoc.street_number +' '+ $rootScope.chosenPlace.address_assoc.route,
            icon: {
              path: MAP_PIN,
              fillColor: '#0071BC',
              fillOpacity: 1,
              strokeColor: '#000000',
              strokeWeight: 2,
              scale: 0.75
            },
            map_icon_label: '<span class="fa fa-fw fa-home"></span>'
          });
        }

        // Add active layer markers
        addMarkers();

      }, 1000);

      function addMarkers() {
        $scope.activeItem = null;
        switch ($scope.layer.type) {
          case 'wordpress':
            $scope.layerLoading = true;
            Post.query({
              postType: 'locations',
              'filter[location-taxonomy]': $scope.layer.slug
            }).$promise.then(function(data) {
              var faIcon, marker, latlng;
              var markers = [];
              for (var i in data) {
                marker = data[i];
                //console.log(marker);
                if (marker.meta != undefined && marker.meta.lat != undefined) {
                  markers[i] = new Marker({
                    map: gMap,
                    position: new google.maps.LatLng(marker.meta.lat, marker.meta.lng),
                    title: marker.title.rendered,
                    icon: {
                      path: MAP_PIN,
                      fillColor: $scope.layer.color ? $scope.layer.color : '#BC3300',
                      fillOpacity: 1,
                      strokeColor: '#aaa',
                      strokeWeight: 1,
                      scale: 0.75
                    },
                    properties: marker,
                    map_icon_label: '<span class="fa pc-map-marker fa-fw '+ $scope.layer.icon +'"></span>'
                  });
                  markers[i].addListener('click', function() {
                    //gMap.setCenter(this.getPosition());
                    //$window.location.hash = '/city/maps/' + $scope.layer.slug + '/wordpress/' + this.properties.slug;
                    $scope.activeItem = this.properties;
                    $scope.$apply();
                  }); 
                }
                
              } // for

              $scope.markers = markers;
              fitToMarkers(markers);
              $scope.layerLoading = false;

            });
            break;
          case 'bicycle':
            mapLayers.bikeLayer = new google.maps.BicyclingLayer();
            mapLayers.bikeLayer.setMap(gMap);
            break;
          case 'traffic':
            mapLayers.trafficLayer = new google.maps.TrafficLayer();
            mapLayers.trafficLayer.setMap(gMap);
            break;
          case 'transit':
            mapLayers.transitLayer = new google.maps.TransitLayer();
            mapLayers.transitLayer.setMap(gMap);
            break;

        } // switch
      }


      function clearMarkers() {
        if ($scope.markers != undefined) {
          for (var i = 0; i < $scope.markers.length; i++ ) {
            $scope.markers[i].setMap(null);
          }
        }
        for (var i in mapLayers) {
          mapLayers[i].setMap(null);
        }
        mapLayers = {};
      }

      $scope.changeLayer = function(layer) {
        clearMarkers();
        $scope.layer = layer;
        addMarkers();
      }

      // Pan & Zoom map to show all markers
      // From http://stackoverflow.com/questions/3334729/google-maps-v3-fitbounds-zoom-too-close-for-single-marker
      function fitToMarkers(markers) {

        if ($attrs.zoomToMarkers) {
          var bounds = new google.maps.LatLngBounds();

          // Create bounds from markers
          for( var index in markers ) {
              var latlng = markers[index].getPosition();
              bounds.extend(latlng);
          }

          // Don't zoom in too far on only one marker
          if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
             var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
             var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
             bounds.extend(extendPoint1);
             bounds.extend(extendPoint2);
          }

          gMap.fitBounds(bounds);
        }

      }

     
    }
  }
})