'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        // FAQ depth 0
        .state("city.faq", {
          url: "/answers",
          templateUrl: 'views/apps/311App/faq/faq.html',
          data: { 
            title: 'FAQ',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          resolve: {
            terms: function($stateParams, $rootScope, TaxonomyTerm) {
              return TaxonomyTerm.query({
                vocabulary: 'faq-topic'
              }).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, terms, $window){
            $scope.terms = terms;
            $scope.active = null;
            $scope.childOpen = false;

            $scope.open = function(item) {
              $window.ga('send', {
                hitType: 'event',
                eventCategory: 'ActionsApp',
                eventAction: 'category open',
                eventLabel: item.slug
              });
              $scope.active = item;
            }

            $scope.openChildren = function() {
              $scope.childOpen = true;
            }

            // var slug = $state.params.slug,
            //     nid = $state.params.nid ? $state.params.nid : 'list';

            // if(slug) {
            //   $state.go('city.faq.child.answers', {slug: slug, nid: nid});
            // }
          }

        })

        // FAQ depth 1
        .state("city.faq.child", {
          url: "/:slug",
          templateUrl: 'views/apps/311App/faq/faq-child.html',
          data: { 
            title: 'FAQ',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords
            undoMainToggle: false           // Force "offcanvas" class off
          },
          resolve: {
            nodes: function($stateParams, $rootScope, Post) {
              // @todo: put this in resolve
              return Post.query({
                postType: 'questions',
                'filter[faq-topic]': $stateParams.slug
              }).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, $filter, terms, nodes){
            $scope.activeTerm = $filter('termBySlug')(terms, $state.params.slug);
            $scope.activeParent = $filter('termById')(terms, $scope.activeTerm.parent);
            // Order to top the active item on first load
            if($state.params.postSlug && $state.params.postSlug !== 'list') {
              for (var i=0; i<nodes.length; i++) {
                if (nodes[i].slug == $state.params.postSlug) {
                  var element = nodes[i];
                  nodes.splice(i, 1);
                  nodes.splice(0, 0, element);
                }
              }
            }
            $state.go('city.faq.child.answers', {nid: 'list'});

          }
        })

        // FAQ depth 2
        .state("city.faq.child.answers", {
          url: "/:postSlug",
          templateUrl: 'views/apps/311App/faq/faq-child-answers.html',
          data: { 
            title: 'FAQ',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords
          },
          controller: function($scope, $rootScope, $state, $filter, $window, nodes){
            $scope.activeSlug = $state.params.postSlug != 'list' ? $state.params.postSlug : null;
            $scope.nodes = nodes;
            // Click event for heart button
            $scope.heartClick = function(node, e) {
              e.preventDefault();
              node.hearted = (node.hearted == undefined || !node.hearted)
              $window.ga('send', {
                hitType: 'event',
                eventCategory: 'Score',
                eventLabel: node.title.rendered,
                eventAction: $rootScope.analyticsUrl,
                eventValue: node.hearted ? +5 : -5
              });
              if (node.hearted) {
                $window.ga('send', {
                  hitType: 'event',
                  eventCategory: 'Heart',
                  eventLabel: node.title.rendered,
                  eventAction: $rootScope.analyticsUrl,
                  eventValue: node.hearted ? 1 : -1
                });
              }
            }

          }
        })
    }
  ]
)