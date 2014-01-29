'use strict';

angular.module('gc.utils.debounce', [])
.factory('debounce', [
  '$timeout',
  function debounceFactory($timeout) {

    function debounce(func, wait, immediate) {
      var result;
      var timeout = null;
      return function debounced() {
        var context = this, args = arguments;
        var later = function debounceLater() {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        $timeout.cancel(timeout);
        timeout = $timeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
      };
    }

    return {
      debounce: debounce
    };
  }
]);
