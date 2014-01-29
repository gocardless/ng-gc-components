'use strict';

angular.module('ngGcRavenInitializer', [
  'ngGcUserApiService'
]).run([
  '$window', 'UserApiService',
  function RavenConfigInitializer($window, UserApiService) {

    // Associate Sentry errors with user
    if ('Raven' in $window) {
      UserApiService.findOne().then(function(user) {
        $window.Raven.setUser(user);
      });
    }

  }
]);
