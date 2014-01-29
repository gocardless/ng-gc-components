'use strict';

angular.module('ngGcCapitalize', [
  'ngGcSafeString'
]).filter('capitalize', [
  'safeStringFilter',
  function capitalize(safeStringFilter) {

    return function capitalizeFilter(input) {
      input = safeStringFilter(input);
      return input.substring(0, 1).toUpperCase() + input.substring(1);
    };

  }
]);
