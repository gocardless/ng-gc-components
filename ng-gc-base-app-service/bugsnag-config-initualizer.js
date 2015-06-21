'use strict';

angular.module('ngGcBugsnagInitializer', [
  'ngGcUserApiService'
]).run([
  '$window', 'UserApiService',
  function BugsnagConfigInitializer($window, UserApiService) {

    // Associate Bugsnag errors with user
    if ('Bugsnag' in $window) {
      UserApiService.findOne().then(function(user) {
        $window.Bugsnag.user = user;
      });
    }

  }
]);
