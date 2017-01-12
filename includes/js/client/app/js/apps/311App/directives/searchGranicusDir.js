angular.module('311App')

.directive('searchGranicus', function($rootScope, $state, $timeout, $window,GranicusSearch) {
  return {
    restrict: 'A',
    //replace: true,
    scope: {
      term: '=',
      num: '@'
    },
    templateUrl: 'views/apps/311App/search/granicus.html',
    link: function($scope, $element, $attrs) {
      var num = $attrs.num ? $attrs.num : 5;
      $scope.num = num;
      $scope.items = false;
      var granicusUrl = '//' + _.get(Proud, 'settings.proud_actions_app.global.search_granicus_site');
      var timeoutPromise = false;


      $scope.$watch('term', function(newValue, oldValue) {
        if (newValue) {

          // Add a slight delay
          $timeout.cancel(timeoutPromise);
          timeoutPromise = $timeout(function(){
            $scope.granicusSearchUrl = granicusUrl + '/ViewSearchResults.php?view_id=2&types%5BClip%5D=on&types%5BAgendaItem%5D=on&allwords=' + newValue;
            var params = {
              q: newValue,
              sort: [{"datetime":"desc"}]
            }
            GranicusSearch.query(params).$promise.then(function(data) {
              if (data.hits != undefined && data.hits.total > 0 && data.hits.hits.length) {
                $scope.items = data.hits.hits;
                $scope.more = false; // @todo: data.hits.hits.length > num;
                $scope.num = num;
              }
              else {
                $scope.items = false;
              }
            });
          }, 500);

        }
        else {
          $scope.items = false;
        }
      }, true);

      $scope.go = function(item, $e) {
        $e.preventDefault();
        var url = granicusUrl + '/MediaPlayer.php?clip_id=' + item._source.video_id + '&meta_id=' + item._id;
        $window.open(url, 'granicus', 'width=800,height=700');
      }

      $scope.getTitle = function(item) {
        var text = item._source.name ? item._source.name : item._source.video_name;
        //var matches = text.match(/([0-9]+\.?\s)([a-zA-Z0-9\(\)\s]+)/);
        //text = matches != null && matches[2] != undefined ? matches[2] : text;
        return text;
      }

      $scope.activeDetails = -1;
      $scope.showDetails = function(index, $e) {
        $e.preventDefault();
        $scope.activeDetails = $scope.activeDetails == index ? -1 : index;
      }

      $scope.updateNum = function($e) {
        $e.preventDefault();
        $scope.more = false;
        $scope.num = 100;
        // @todo: make this work
      }

      $scope.granicusSearch = function(url, $e) {
        $e.preventDefault();
        $window.open(url, 'granicus', 'width=800,height=700');
      }

    }
  };
})
