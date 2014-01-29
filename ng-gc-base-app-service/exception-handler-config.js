'use strict';

angular.module('ngGcExceptionHandlerProviderConfig', [
]).config([
  '$provide',
  function($provide) {

    $provide.decorator('$exceptionHandler', [
      '$delegate',
      function($delegate) {
        return function(exception, cause) {
          window.Raven.captureException(exception);
          $delegate(exception, cause);
        };
      }
    ]);

  }
]);
