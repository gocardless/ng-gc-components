'use strict';

angular.module('ngSecurityInterceptor', [
  'ngSecurityRetryQueue'
])
.factory('SecurityInterceptor', [
  '$injector', '$q', 'SecurityRetryQueue',
  function SecurityInterceptor($injector, $q, SecurityRetryQueue) {

    // THIS IS SHIT
    function isAuthResponse(response) {
      return response && response.config &&
        response.config.url.match('/api/auth');
    }

    return {
      responseError: function(response) {
        if (response.status === 401 && !isAuthResponse(response)) {
          // The request bounced because it was not authorized
          return SecurityRetryQueue.pushRetryFn(function retryRequest() {
            // We must use $injector to get the
            // $http service to prevent circular dependency
            return $injector.get('$http')(response.config);
          });
        }
        return $q.reject(response);
      }
    };
  }
])

// We have to add the interceptor to the queue as a
// string because the interceptor depends upon service
// instances that are not available in the config block.
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('SecurityInterceptor');
  }
]);
