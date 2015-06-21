'use strict';

angular.module('ngGcExceptionHandlerProviderConfig', [
]).config([
  '$provide',
  function($provide) {

    $provide.decorator('$exceptionHandler', [
      '$delegate', '$window',
      function($delegate, $window) {
        return function(exception, cause) {
          $delegate(exception, cause);
          $window.Bugsnag.notifyException(exception);
        };
      }
    ]);

  }
]);
