'use strict';


angular.module('311App')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider
        //.when('', '/answers');

      $stateProvider
  
        .state("city.status", {
          url: '/status',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Check Status'
          },
          templateUrl: 'views/apps/311App/issues/issue-status.html',
          controller: function($scope, $rootScope, $state, $timeout, Issue){
            //$scope.code = 'd2a6-1'; // @todo: default value, remove
            //console.log('a', jQuery('#map-wrapper'));

            $scope.tabClick = function(tab, e) {
              e.preventDefault();
              $scope.activeTab = tab;
            }

            $scope.city = $rootScope.activeCity;
            $timeout(function() {
              $scope.showMap = jQuery('.widget-proud-map-app').length;
            }, 2000);
            //console.log($scope);

            $scope.clickMap = function(e) {
              jQuery('#map-wrapper').trigger('click');
              jQuery('#menu-ui a:last').trigger('click');
              e.preventDefault();
            }

            // Get myIssues
            $scope.hasMyIssues = false;
            var local = localStorage.getItem('reportedIssues');
            if (local === -1) {
              $scope.hasMyIssues = -1;
            }
            if (local && local !== -1) {
              $scope.myIssues = JSON.parse(local);
              $scope.activeTab = 'me';
              $scope.hasMyIssues = true;
            }

            // Get recent issues
            $scope.recentIssues = [];
            $scope.recentLoading = true;
            Issue.query().$promise.then(function(data) {
              $scope.recentLoading = false;
              $scope.recentIssues = data;
            });

            $scope.activeTab = $scope.hasMyIssues ? 'me' : 'recent';
            $scope.issueThumb = function(item) {
              return item.thumb ? item.thumb : 
                'https://api.mapbox.com/v4/mapbox.emerald/' + item.lng +','+ item.lat + ',13/300x300@2x.png?access_token=' + $rootScope.mapboxAccessToken;
            }


            // Get recent issues (preload)

            // No remember checkbox callback
            $scope.showLocalCheckbox = true;
            $scope.toggleSave = function() {
              var local = localStorage.getItem('reportedIssues');
              local = local === -1 ? [] : -1;
              localStorage.setItem('reportedIssues', local);
              if (local == -1) {
                alert('We have deleted your saved issues and will not store issues you submit on this device in the future.');
                $scope.showLocalCheckbox = false;
              }
            }


          }
        })

        .state("city.status.item", {
          url: '/:code?saved',
          data: { 
            undoMainToggle: false,   // Force "offcanvas" class off
          },
          templateUrl: 'views/apps/311App/issues/issue-status-result.html',
          controller: function($scope, $rootScope, $state, $window, Issue){
            $scope.code = $state.params.code;
            $scope.currentUrl = '';
            $scope.loading = true;
            $scope.error = false;
            $scope.saved = $state.params.saved;

            Issue.get({code: $state.params.code}).$promise.then(function(data) {
              $scope.loading = false;
              if (data != undefined) {
                $scope.item = data;
                $scope.currentUrl = $window.location.href.substring(0, $window.location.href.indexOf('?'));
              }
              else {
                $scope.error = true;
              }
            });
          }
        })

        .state("city.report", {
          url: '/report',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Report Issue'
          },
          templateUrl: 'views/apps/311App/issues/issue-create-categories.html',
          resolve: {
            services: function($stateParams, IssueTypes, Post, $rootScope) {
              var issue = _.get(Proud, 'settings.proud_actions_app.global.issue') || {'service': 'seeclickfix'};
              if (issue.service == 'seeclickfix') {
                return IssueTypes.query().$promise.then(function(data) {
                  return data['request_types'] != undefined ? data['request_types'] : null;
                });
              }
              else {
                return Post.query({
                  postType: 'issues'
                }).$promise.then(function(data) {
                  return data;
                });
              }
            }
          },
          controller: function($scope, $rootScope, $state, services){
            var issue = _.get(Proud, 'settings.proud_actions_app.global.issue') || {'service': 'seeclickfix'};
            $scope.service = issue.service;
            $scope.types = services;
          }
        })


        .state("city.report.iframe", {
          url: '/embed/:slug',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Report Issue'
          },
          templateUrl: 'views/apps/311App/issues/issue-create-iframe.html',
          resolve: {
            post: function($stateParams, $filter, services) {
              return $filter('filter')(services, { slug: $stateParams.slug })[0];
            }
          },
          controller: function($scope, $rootScope, $state, $sce, post){
            $scope.post = post;
            $scope.trustSrc = function(post) {
              var src = post.meta.form ? $rootScope.gravityformsIframe + post.meta.form : post.meta.iframe;
              return $sce.trustAsResourceUrl(src);
            }
          }
        })


        .state("city.report.map", {
          url: '/:type',
          data: { 
            undoMainToggle: false,   // Force "offcanvas" class off
            undoChildToggle: 1       // Force "offcanvas" class off for child
          },
          templateUrl: 'views/apps/311App/issues/issue-create-map.html',         
          controller: function($scope, $rootScope, $state, $http){
            $scope.type = $state.params.type;

            $scope.next = function() {
              if ($scope.marker == undefined || !$scope.marker) {
                alert('Please enter an address, or click the Locate button to use your current location.');
              }
              else {
                var latlng = $scope.marker.getLatLng();
                $state.go('city.report.map.details', {
                  lat: latlng.lat,
                  lng: latlng.lng
                });
              }
            }

            $scope.$watch('config', function(value){

              L.mapbox.accessToken = $rootScope.mapboxAccessToken;

              var map = new L.mapbox.Map('issue-map', $rootScope.mapboxMap, {
                  center: new L.LatLng($rootScope.location.lat, $rootScope.location.lng),
                  zoom: 15,
                  scrollWheelZoom: false
              });

              $scope.marker = null;

              var addMarker = function(self) {
                var latlng = self.latlng != undefined ? self.latlng : new L.LatLng(self.feature.center[1], self.feature.center[0]);
                $scope.marker = L.marker(latlng, {
                  icon: L.mapbox.marker.icon({
                      'marker-color': 'ff8888'
                  }),
                  draggable: true
                }).addTo(map);
                $scope.$apply();
              }

              // Add marker when the map is clicked (if it hasn't already been added)
              map.on('click', function(self) {
                if ($scope.marker === null) {
                  addMarker(self);
                }
              });

              // Add geocode control, add marker when selected
              map.addControl(L.mapbox.geocoderControl('mapbox.places', {
                  keepOpen: true,
                  autocomplete: true
              }).on('select', addMarker).on('autoselect', addMarker));
              
              // Add locate control, add marker when located
              L.control.locate({
                drawCircle: true
              }).addTo(map);
              map.on('locationfound', addMarker);
              
            });

          }
        })

        .state("city.report.map.details", {
          url: '/details?lat&lng',
          data: { 
            undoChildToggle: false   // Force "offcanvas" class off for child?
          },
          templateUrl: 'views/apps/311App/issues/issue-create-details.html',
          resolve: {
            data: function($stateParams, $rootScope, IssueFields) {
              return IssueFields.get({
                type: $stateParams.type
              }).$promise.then(function(data) {
                return {
                  categoryTitle: data.title,
                  fields: data.questions
                };
              });
            }
          },
          controller: function($scope, $rootScope, $state, data, Issue, IssueAddress){
            $scope.type = $state.params.type;
            $scope.form = {
              'request_type_id': $scope.type,
              'lat': $state.params.lat,
              'lng': $state.params.lng,
              'answers': {}
            }
            $scope.fields = data.fields;
            $scope.form.category = data.categoryTitle;
            $scope.form.address = data.address;
            $scope.submitLabel = 'Continue with SeeClickFix';

            $scope.guestAllowed = true;
            $scope.form.guest = false;
            $scope.toggleGuest = function(e) {
              e.preventDefault();
              $scope.form.guest = !$scope.form.guest;
              $scope.submitLabel = 'Submit';
            }

            $scope.form.address = '';
            IssueAddress.get({
              type: $state.params.type,
              lat: $state.params.lat,
              lng: $state.params.lng
            }).$promise.then(function(data) {
              $scope.form.address = data.address;
            });


            $scope.submit = function(data) {

              /*var issue = new TrackIssue(data);
              issue.$save(function(data, putResponseHeaders) {
                console.log(data);
                //u => saved user object
                //putResponseHeaders => $http header getter
              });*/

              if (!data.guest) {
                var url = 'https://test.seeclickfix.com/oauth/authorize?response_type=code'
                  + '&client_id=' + 'YOUR_CLIENT_ID'
                  + '&redirect_uri=' + 'http://api.proudcity.com:4000'; //@todo!!

                var authorizeWindow = window.open(url, "authorize", "width=400,height=420");
              }
              else {
                var issue = new Issue(data);
                issue.$save(function(data){

                  // Save issue history in localStorage
                  var local = localStorage.getItem('reportedIssues');
                  //local = '[]';
                  if (local !== -1) {
                    local = local ? JSON.parse(local) : [];
                    local.push({
                      created_at: data.created_at,
                      title: data.summary,
                      id: data.id,
                      address: data.address
                    });
                    localStorage.setItem('reportedIssues', JSON.stringify(local));
                  }
                  
                  // Redirect
                  $state.go('city.status.item', {
                    code: data.id,
                    saved: local === -1 ? 1 : 2
                  });

                }, function(err){
                  // @todo: better error handling here
                  $scope.errors = '';
                  for (var i in err.data.errors) {
                    $scope.errors += '<div>'+err.data.errors[i][0]+'</div>';
                  }
                });
              }



              


            }
          }

        })



    }
  ]
);
