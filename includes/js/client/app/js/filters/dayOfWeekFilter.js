'use strict';

angular.module('app')

.filter('dayOfWeekFilter', 

  function ($rootScope) {
    return function(value) {
      var search = [ 'Mon', 'Monday', 'Tue', 'Tuesday', 'Wed', 'Wednesday', 'Thu', 'Thursday', 'Fri', 'Friday', 'Sat', 'Saturday', 'Sun', 'Sunday' ];
      var replace = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7 ];
      var daysofweek = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
      var out = value;
      for (var i=0; i<search.length; i++) {
        out = out.replace(new RegExp(search[i], 'i'), replace[i]);
      }
      var replaced = out.replace(/[^0-9,.]/g, '');

      // If there are 6+ non-day of the week characters, it's not a day, so we output the original value.
      if (out.length - replaced.length > 5) {
        return value;
      }

      out = parseInt(replaced);
      return isNaN(out) ? value : daysofweek[out-1];
    }
  }
);


