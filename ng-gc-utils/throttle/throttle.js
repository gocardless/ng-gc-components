'use strict';

angular.module('gc.utils.throttle', [])
.factory('throttle', [
  '$timeout',
  function throttleFactory($timeout) {

    function throttle(func, wait, immediate) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      var later = function() {
        previous = new Date();
        timeout = null;
        result = func.apply(context, args);
      };

      return function() {
        var now = new Date();
        if (!previous && immediate === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          $timeout.cancel(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
        } else if (!timeout) {
          timeout = $timeout(later, remaining);
        }
        return result;
      };
    }

    return {
      throttle: throttle
    };
  }
]);
