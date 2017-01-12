'use strict';

angular.module('311App')

.directive('menu', function factory($rootScope, Menu311, $state) {
  return {
    restrict: 'A',
    templateUrl: 'views/apps/311App/menu311.html',
    link: function($scope, $element, $attrs) {
      // Push to scope
      $scope.menu = Menu311.getMenu($rootScope.appId);
      $scope.loading = null;

      $scope.menuClick = function(index, item) {
        console.log('state',$state);
        console.log(item);
        if ($state.current.name != 'city.' + item.state) {
          $scope.loading = index;
        }
        
      }

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
        $scope.loading = null;
      });
    }
  }
})


.directive('mainToggle', function($window, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      'mainToggle': '@',
      'mainToggleNest': '@',
      'mainToggleForce': '@',
      'mainToggleEnter': '@'
    },
    link: function($scope, $element, $attrs) {
      var select = $scope.mainToggleNest ? '-' + $scope.mainToggleNest : '';
      // Are we a link?
      if(!$scope.mainToggleEnter) {
        // listen for a click
        $element.on('click', function() {
          // Animate down if necessary
          // if($rootScope.currentYPosition() < 300) {
          //   $('html, body').animate({
          //     scrollTop: $('#wrapper-311').offset().top - 170
          //   }, 300);
          // }
          $rootScope.toggleMain($scope.mainToggle, $scope.mainToggleForce, select);
        });
      }
      // or just showing up?
      else {
        $rootScope.toggleMain($scope.mainToggle, $scope.mainToggleForce, select);
      }
    }
  }
})



.directive('menuClick', function factory($window, $browser) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {

      $element.on('click', function(event) {
        jQuery('.app-wrap').toggleClass('show-nav');
        if($attrs.menuClick && $attrs.menuClick == "return-false") {
          event.stopPropagation();
          return false;
        }
      });
    }
  }
})


// Open external links in a new tab?
.directive('href', function($rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {

      if ($rootScope.externalLinkWindow) {
        var a = new RegExp('/' + window.location.host + '/');
        var href = $attrs.ngHref != undefined ? $attrs.ngHref : $attrs.href;
        if(href != undefined && href.indexOf('http') != -1 && !a.test(href)) {       
          $element.attr('target', '_blank');
        }
      }

    }
  };
});
