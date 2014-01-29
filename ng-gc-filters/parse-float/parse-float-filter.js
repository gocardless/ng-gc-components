'use strict';

angular.module('ngGcParseFloat', [
]).filter('parseFloat', [
  '$window',
  function parseFloat($window) {
    return function parseFloatFilter(input) {
      return $window.parseFloat(input, 10);
    };
  }
]);
