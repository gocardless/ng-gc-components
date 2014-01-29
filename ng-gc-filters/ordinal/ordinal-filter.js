'use strict';

angular.module('ngGcOrdinal', [])
.filter('ordinal', [
  '$window',
  function ordinal($window) {

    return function ordinalFilter(input) {
      if ($window.parseInt(input, 10) > 0) {
        return $window.moment.langData().ordinal(input);
      } else return '';
    };

  }
]);
