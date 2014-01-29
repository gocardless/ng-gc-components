'use strict';

angular.module('ngSecurityInterceptor', [
  'ngSecurityRetryQueue'
])
.factory('SecurityInterceptor', [
  '$injector', 'SecurityRetryQueue',
  function SecurityInterceptor($injector, SecurityRetryQueue) {

    // THIS IS SHIT
    function isAuthResponse(response) {
      return response && response.config &&
        response.config.url.match('/api/auth');
    }

    return function(promise) {
      return promise.then(null, function(response) {
        if (response.status === 401 && !isAuthResponse(response)) {
          // The request bounced because it was not authorized
          promise = SecurityRetryQueue.pushRetryFn(function retryRequest() {
              // We must use $injector to get the
              // $http service to prevent circular dependency
              return $injector.get('$http')(response.config);
            });
        }
        return promise;
      });
    };
  }
])

// We have to add the interceptor to the queue as a
// string because the interceptor depends upon service
// instances that are not available in the config block.
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.responseInterceptors.push('SecurityInterceptor');
  }
]);
