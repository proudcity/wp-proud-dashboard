'use strict';

angular.module('wordpressService', ['ngResource'])

  .factory('Post', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + ':postType/:id', 
      {
        'id': '@nid',
        'postType': '@postType', 
        per_page: 100,
      },
      {
        get: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: false
        },
        query: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: false,
          isArray: true
        }
      }
    );
  }])

  .factory('TaxonomyTerm', ['$resource', '$rootScope', function ($resource, $rootScope) {
    var params = {
      vocabulary: '@vocabulary',
      per_page: 100,
    };
    if($rootScope.categorySection) {
      params['field_faq_section'] = $rootScope.categorySection;
    }
    return $resource($rootScope.apiUrl + ':vocabulary/:tid', 
      params,
      {
        get: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: true,
          isArray: false
        },
        query: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: true,
          isArray: true
        }
      }
    )
  }])


  .factory('Search', ['$resource', '$rootScope', function ($resource, $rootScope) {
    var params = {
      term: '@term',
    };
    return $resource($rootScope.apiUrl + 'search', 
      params,
      {
        query: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: true,
          isArray: true
        }
      }
    )
  }])



  /*
  .factory('TaxonomyTermPosts', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/taxonomy_term_nodes', {tid: '@tid'}, {});
  }])

  .factory('User', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/user/:uid', {uid: '@uid'}, {});
  }])

  .factory('Comment', ['$resource', '$rootScope', function ($resource, $rootScope) {
      return $resource($rootScope.apiUrl + '/node/:nid/comments', {nid: '@nid'}, {
          'post': {
              method: 'POST',
              url: '/entity/comment'
          }
      });
  }])
  */

