'use strict';


angular.module('311App')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      // Redirect if on local parent
      $urlRouterProvider.when(/city\/local$/i, 
        [          '$match', '$stateParams', '$rootScope', 
          function ($match,   $stateParams,   $rootScope) {
            if (!$rootScope.chosenPlace) {
              var chosenPlace = localStorage.getItem('chosenPlace');
              $rootScope.chosenPlace = chosenPlace ? JSON.parse(chosenPlace) : null;
            }
            if ($rootScope.chosenPlace) {
              return '/city/local/location/' + $rootScope.chosenPlace.geometry.location.lat 
                   + ',' + $rootScope.chosenPlace.geometry.location.lng;
              
            }
            else {
              return '/city/local/address';
            }
          }
        ]
      );

      $stateProvider
        .state("city.local", {
          url: "/local",
          template: '<div ui-view></div>',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          resolve: {
            services: function($rootScope){
              //var instance = 'settings.proud_actions_app.instances.' + $rootScope.appId;
              return _.get(Proud, 'settings.proud_actions_app.global.services');
            }
          }
        })

        .state("city.local.address", {
          url: "/address",
          templateUrl: 'views/apps/311App/local/local-address.html',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window, services){

            $scope.city = $rootScope.location.city;
            $scope.services = services;
            //$scope.place = null;
            //$scope.chosenPlace = $rootScope.chosenPlace;

            //var instance = 'settings.proud_actions_app.instances.' + $rootScope.appId;
            //var bgImage = _.get(Proud, instance + '.background');
            //$scope.bgStyle = bgImage ? 'background: url('+ bgImage +');background-size: 100%;min-height: 400px;' : '';

            $scope.showLocalInfo = false;
            $scope.toggleLocalInfo = function($e) {
              $e.preventDefault();
              $scope.showLocalInfo = !$scope.showLocalInfo;
            }
            
          }
        })


        .state("city.local.location", {
          url: "/location/:latlng",
          templateUrl: 'views/apps/311App/local/local-location.html',
          data: { 
            title: 'Local',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          resolve: {
            data: getChosenPlace
          },
          controller: function($scope, $rootScope, $state, $window, data, services){

            // Structure the address data
            $scope.place = data;

            $scope.services = _.filter(services, function(service) {
              if (service.title.toLowerCase() == 'boundary') {
                $scope.boundary = service;
                return false;
              }
              else if (service.title.toLowerCase() == 'neighborhood') {
                $scope.neighborhood = service;
                return false;
              }
              return true;
            });

            // @todo: this is placeholder
            /*$scope.services = {
              garbage: 'Wednesday',
              streetSweeping: 'First and third Wednesday each month',
              fire: 'Fire District 4',
              police: 'Beat 2'
            }*/            
          }
        })
        
        .state("city.local.officials", {
          url: "/officials/:latlng",
          templateUrl: 'views/apps/311App/local/local-officials.html',
          data: { 
            title: 'Local',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          resolve: {
            data: getChosenPlace
          },
          controller: function($scope, $rootScope, $state, $window, GoogleRepresentatives, data){
            var sections = [
              {
                'pattern': 'place'
              },
              {
                'pattern': 'county'
              },
              {
                'pattern': 'state'
              },
              {
                'pattern': 'country'
              }
            ];

            $scope.place = data;
            $scope.latlng = $state.params.latlng;
            
            $scope.sections
            GoogleRepresentatives.get().$promise.then(function(data) {
              // Filter out to only the officials that match $scope.item.pattern and reformat object.
              for (var s=0; s<sections.length; s++) {
                sections[s].officials = [];
                for (var d in data.divisions) {
                  if (data.divisions[d] != null && d.match(new RegExp(sections[s].pattern))) {
                    sections[s].name = sections[s].name == undefined ? data.divisions[d].name : sections[s].name;
                    if (data.divisions[d].officeIndices != undefined) {
                      for (var j=0; j<data.divisions[d].officeIndices.length; j++) {
                        var officeIndex = data.divisions[d].officeIndices[j];
                        for (var i=0; i<data.offices[officeIndex].officialIndices; i++) {
                          var index = data.offices[officeIndex].officialIndices[i];
                          if (index != undefined && data.officials[index] != null) {
                            data.officials[index].office = data.offices[officeIndex].name;
                            sections[s].officials.push(data.officials[index]);
                            data.officials[index] = null;
                          }
                        } // for i
                      }
                    } // if
                    data.divisions[d] = null;
                  } // if d.match()
                }
              } // for

              $scope.sections = sections;
            });

            /*$scope.sections({
              
            })*/

            $scope.localOffice = function(matches, office) {
              for (var i=0; i<matches.length; i++) {
                if (office.divisionId.indexOf(matches[i]) != -1) {
                  return true
                }
              }
              return false;
            }

            $scope.toggleAddress = function(i, $e) {
              $e.preventDefault();
              $scope.data.officials[i].addressActive = $scope.data.officials[i].addressActive == undefined || !$scope.data.officials[i].addressActive ? true : false;
            }     
            
          }
        })

      
    }
  ]
);


// A resolve callback function to ensure we have an address
var getChosenPlace = function($stateParams, $rootScope, GoogleCivicInfo) {
  var item;
  $rootScope.chosenPlace = null;
  if ($rootScope.chosenPlace) {
    $rootScope.chosenPlace = addAddressAssoc($rootScope.chosenPlace);
    return $rootScope.chosenPlace;
  }
  else {

    var latlng = $stateParams.latlng.split(',');
    latlng = {lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1])};
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({'location' : latlng}, function(results, status) {    
      if (status === 'OK') {           
        $rootScope.chosenPlace = addAddressAssoc(results[0]);
        if (localStorage.getItem('chosenPlace')) {
          localStorage.setItem('chosenPlace', JSON.stringify($rootScope.chosenPlace));
        }
        deferred.resolve($rootScope.chosenPlace);
      } else {
        deferred.reject(status);
      }          
    });

    return deferred.promise();

  }
}


// Adds an address_assoc param to chosenPlace for easier address manipulation.
var addAddressAssoc = function(data) {
  data.address_assoc = {};
  for (var i in data.address_components) {
    switch(data.address_components[i].types[0]) {
      case 'route': 
        data.address_assoc['route_short'] = data.address_components[i].short_name;
        break;
    }
    data.address_assoc[data.address_components[i].types[0]] = data.address_components[i].long_name;
  }
  data.address_assoc.administrative_area_level_2 = data.address_assoc.administrative_area_level_2.replace('County', '');
  data.name = data.name != undefined ? data.name : data.formatted_address;
  return data;
}