// Provides active menu
// in a provider so that config can be accessed
// in a .config() call

'use strict';

angular.module('311App')



    self.getDefaultUrl = function(appId)  {
      initMenu(appId);
      return default311Url;
    }

    self.getMenu = function(appId) {
      initMenu(appId);
      return menu;
    }
    
    // Just return self
    self.$get = function() {
      return self;
    };

  });