angular.module('311App')

.directive('shareBlock', function factory($window, $browser, $http) {
  return {
    restrict: 'A',
    template: '<a ng-click="fbScript($event)" href="https://www.facebook.com/sharer/sharer.php" target="_blank"><i class="fa fa-facebook-square fa-fw"></i><span>Facebook</span></a> &nbsp;'
      + '<a ng-click="twitScript($event)" href="http://twitter.com/share"><i class="fa fa-twitter-square fa-fw"></i><span>Twitter</span></a> &nbsp;'
      + '<a ng-href="{{mailTo()}}"><i class="fa fa-envelope fa-fw"></i><span>Email</span></a>',
    controller: function($element, $scope, $window) {

      var href = $element.attr('href') ? $element.attr('href') : $window.location.origin.replace('-embed', '');
      var title = $element.attr('title');
      var summary = $element.attr('summary');

      $scope.mailTo = function() {
        return 'mailto:?subject='
              + encodeURIComponent(title)
              + '&body=' + encodeURIComponent(summary) + ' '
              + encodeURIComponent(href);
      }      

      

      $scope.fbScript = function($e) {
        $e.preventDefault();
        $window.open(
          '//www.facebook.com/sharer.php?m2w&s=100'
            + '&p[url]='  + encodeURIComponent(href)
            + '&p[title]=' + encodeURIComponent(title)
            + '&p[summary]=' + encodeURIComponent(summary)
            + '&p[images][0]=' + encodeURIComponent('https://proudcity.com/wp-content/uploads/2015/12/pc-icon-blue-square.png'),
          '_blank',
          'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0'
        );
      };

      $scope.twitScript = function($e) {
        $e.preventDefault();
        $window.open(
          '//twitter.com/intent/tweet?' 
            + 'url='  + encodeURIComponent(href)
            + '&text=' + encodeURIComponent(title +' '+ summary),
          '_blank',
          'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0'
        );
      };
    }
  }
})