'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .when('/vote', '/vote/address');

      $stateProvider
        .state("city.vote", {
          url: "/vote",
          template: '<div ui-view></div>',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window){

            
            /*$scope.$on('$stateChangeStart', function(event, toState, toParams) {

              alert('asdf');
            });*/
            /*
            $scope.$on('$viewContentLoaded', function(event){

              
            });*/

            // We just need to determine if we redirect to city.vote
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
              if(toState.name == 'city.vote') {
                $state.go('city.vote.address');
              }
            });

            if ($state.current.name == 'city.vote') {
              $state.go('city.vote.address');
            }

          }
        })

        .state("city.vote.embed", {
          url: "/embed",
          templateUrl: 'views/apps/311App/vote/vote-embed.html',
          data: { 
            title: 'Embed',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          }
        })

        .state("city.vote.address", {
          url: "/address",
          templateUrl: 'views/apps/311App/vote/vote-address.html',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window){
            $scope.place = null;
            $scope.chosenPlace = null;
            $rootScope.chosenPlace = null;

            $scope.chosenUpdate = function() {
              if ($rootScope.chosenPlace != null) {
                $scope.chosenPlace = $rootScope.chosenPlace;
                $state.go('city.vote.location', {
                  latlng: $rootScope.chosenPlace.geometry.location.lat() +','+ $rootScope.chosenPlace.geometry.location.lng(),
                  address: $rootScope.chosenPlace.formatted_address
                });
              }
            }
          }

        })

        .state("city.vote.location", {
          url: "/:latlng/:address",
          templateUrl: 'views/apps/311App/vote/vote-wrapper.html',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          resolve: {
            data: function($stateParams, $rootScope, GoogleCivicInfo) {
              return GoogleCivicInfo.query({
                address: $stateParams.address
              }).$promise.then(function(data) {
                if (data.election) {
                  var date = new Date(data.election.electionDay);
                  var monthNames = ["Jan", "Feb", "March", "April", "May", "June","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  data.election.date = {
                    days: Math.round((date - new Date())/(1000*60*60*24)),
                    month: monthNames[date.getUTCMonth()],
                    day: date.getUTCDate(),
                    year: date.getUTCFullYear()
                  }
                }
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, $window, data){
            $state.go('city.vote.location.how');

            if (data.election) {
              $scope.date = data.election.date;
            }
            
          }
        })

      .state("city.vote.location.how", {
          url: "/how",
          templateUrl: 'views/apps/311App/vote/vote-how.html',
          data: { 
            title: 'How to Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window, data){
            //console.log(data);
            var home = $state.params.latlng.split(',');
            home = new google.maps.LatLng(parseFloat(home[0]), parseFloat(home[1]));

            var geocoder = new google.maps.Geocoder();
            var bounds = new google.maps.LatLngBounds();

            // Add map
            var myOptions = {
              zoom: 14,
              center: home,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('google-map'), myOptions);
            
            // Add home pin
            // Custom icons from https://sites.google.com/site/gmapsdevelopment/
            new google.maps.Marker({
                map: map,
                position: home,
                title: 'Your address'.toUpperCase(),
                icon: '//maps.google.com/mapfiles/kml/pal3/icon31.png',
                shadow: '//maps.google.com/mapfiles/kml/pal3/icon31s.png' //@todo
            });
            bounds.extend(home);

            // Helper function
            var marker;
            $scope.addMarker = function(address, label, color){
              geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == 'OK') {
                  marker = new google.maps.Marker({
                      map: map,
                      position: results[0].geometry.location,
                      title: label.toUpperCase(label),
                      icon: '//raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_'+ color +'.png'
                      //shadow: '//maps.google.com/mapfiles/ms/micons/pushpin_shadow.png' //@todo
                  });
                  bounds.extend(marker.getPosition());
                  map.fitBounds(bounds);
                }
              });
            }

            // Add polling place pins
            data.pollingLocations = typeof data.pollingLocations == 'array' ? data.pollingLocations : [];
            var combinedLocations = data.pollingLocations.concat(data.earlyVoteSites);
            combinedLocations = combinedLocations[0] == undefined ? [] : combinedLocations;
            if (combinedLocations != undefined && combinedLocations.length > 0) {
              var addr;
              var address;
              for (var i in combinedLocations) {
                addr = combinedLocations[i].address;
                address = addr.line1 + ', ' + 
                  (addr.line2 != undefined ? addr.line2 + ', ' : '') + 
                  addr.city + ', ' + addr.state + ' ' + addr.zip;
                $scope.addMarker(address, 'Polling place: ' + addr.locationName, i >= data.pollingLocations.length ? 'green' : 'orange');
              }

              $scope.directionsLink = '//maps.google.com/maps/dir/' + encodeURIComponent($state.params.latlng) + '/' + encodeURIComponent(address);
              $scope.address = combinedLocations[0].address;
              $scope.hours = combinedLocations[0].pollingHours.replace(/\n/g, '<br>');
              var arrHrs = $scope.hours.split("<br>");
              $scope.shortHours = arrHrs.length > 3 ? [arrHrs[0], arrHrs[1], arrHrs[2]].join("<br>") : null;
              $scope.longHours = false;
              $scope.sources = combinedLocations[0].sources;
              $scope.isEarly = i >= data.pollingLocations.length;
            }

            $scope.links = data.state ? data.state[0].electionAdministrationBody : null;
            $scope.date = data.election.date;

            $scope.disclaimer = false;
            $scope.toggleDisclaimer = function($e) {
              $e.preventDefault();
              $scope.disclaimer = !$scope.disclaimer;
            }

            $scope.getDirections = function($e) {
              $e.preventDefault();
              window.open($scope.directionsLink);
            }

            $scope.toggleHours = function($e) {
              $e.preventDefault();
              $scope.longHours = !$scope.longHours; 
            }

            $scope.mapScroll = function($e) {
              $e.preventDefault();
              document.getElementById('google-map').scrollIntoView(true);
            }
          }

        })



        .state("city.vote.location.issues", {
          url: "/issues",
          templateUrl: 'views/apps/311App/vote/vote-issues.html',
          data: { 
            title: 'Issues',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $filter, data){
            $scope.contests = $filter('filter')(data.contests, {type: 'Referendum'});

            $scope.active = null;
            $scope.setActive = function(val, $e) {
              $e.preventDefault();
              $scope.active = val;
            }
          }

        })


        .state("city.vote.location.candidates", {
          url: "/candidates",
          templateUrl: 'views/apps/311App/vote/vote-candidates.html',
          data: { 
            title: 'Candidates',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $filter, data){
            $scope.contests = $filter('filter')(data.contests, {type: 'General'}).slice().reverse();

            $scope.googleSearch = function(name, loc, $e) {
              $e.preventDefault();
              window.open('//google.com/search?q=' + encodeURIComponent(name)); // +' '+ loc
            }
          }

        })
      
    }
  ]
)