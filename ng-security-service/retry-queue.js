'use strict';

// This is a generic retry queue for security failures.
// Each item is expected to expose two functions: retry and cancel.

angular.module('ngSecurityRetryQueue', [
]).factory('SecurityRetryQueue', [
  '$q', '$log', '$window',
  function SecurityRetryQueue($q, $log, $window) {
    var retryQueue = [];

    var service = $window.ObjectFactory.create({
      EVENTS: Object.freeze({
        PUSH: '__push__'
      }),
      hasMore: function() {
        return retryQueue.length > 0;
      },
      push: function(retryItem) {
        retryQueue.push(retryItem);
        service.emit(service.EVENTS.PUSH);
      },
      pushRetryFn: function(retryFn) {
        // The deferred object that will be resolved or
        // rejected by calling retry or cancel
        var deferred = $q.defer();
        var retryItem = {
          retry: function() {
            // Wrap the result of the retryFn into a promise
            $q.when(retryFn()).then(function(value) {
              // If it was successful then resolve our deferred
              deferred.resolve(value);
            }, function(value) {
              // Othewise reject it
              deferred.reject(value);
            });
          },
          cancel: function() {
            // Give up on retrying and reject our deferred
            deferred.reject();
          }
        };
        service.push(retryItem);
        return deferred.promise;
      },
      cancelAll: function() {
        while(service.hasMore()) {
          retryQueue.shift().cancel();
        }
      },
      retryAll: function() {
        while(service.hasMore()) {
          retryQueue.shift().retry();
        }
      }
    });

    return service;
  }
]);
