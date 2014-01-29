'use strict';

angular.module('ngGcSafeString', [])
.filter('safeString', [
  function safeString() {

    return function safeStringFilter(input) {
      return angular.isString(input) ? input : '';
    };

  }
]);
