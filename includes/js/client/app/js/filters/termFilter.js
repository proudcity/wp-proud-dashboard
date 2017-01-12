'use strict';

angular.module('app')


// Returns term object
.filter('termById', function() {
  return function(items, id) {
    for(var i = 0; i < items.length; i++) {
      if(parseInt(items[i].id) == parseInt(id)) {
        return items[i];
      }
    }
    return null;
  }
})


// Returns term object
.filter('termBySlug', function() {
  return function(items, slug) {
    for(var i = 0; i < items.length; i++) {
      if(items[i].slug === slug) {
        return items[i];
      }
    }
    return null;
  }
})

// .filter('itemsHaveTerm', function () {
//   return function(items, field, value) {
//     var filtered = [];
//     for(var i = 0; i < items.length; i++) {
//       if(parseInt(items[i].id) == parseInt(id)) {
//         filtered.push(items[i]);
//       }
//     }
//     return filtered;
//   }
// })

// Filters by checking there are no parents
.filter('termsNoParent', function() {
  return function(items, categories) {
    var filtered = [];
    for(var i = 0; i < items.length; i++) {
      if(items[i].parent == 0) {

        if( !categories )
          filtered.push(items[i]);
        else {
          if( categories.indexOf(items[i].slug) >= 0 )
            filtered.push(items[i]);
        }
      }
    }
    return filtered;
  }
})

// Filters by parent id
.filter('termsByParent', function() {
  return function(items, id) {
    var filtered = [];
    for(var i = 0; i < items.length; i++) {
      if (items[i].parent == id) {
        filtered.push(items[i]);
      }
    }
    return filtered;
  }
});